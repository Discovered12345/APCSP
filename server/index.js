import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection (server-side only)
const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
if (!databaseUrl) {
	console.error('❌ DATABASE_URL not found in environment variables');
	process.exit(1);
}

const sql = neon(databaseUrl);

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:5173',
		credentials: true
	})
);
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // 5 attempts per window
	message: { error: 'Too many authentication attempts, please try again later' }
});

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests per window
	message: { error: 'Too many requests, please try again later' }
});

// JWT middleware
const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Access token required' });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'your-secret-key'
		);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(403).json({ error: 'Invalid or expired token' });
	}
};

// Initialize database tables
async function initializeDatabase() {
	try {
		// Create users table
		await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        profile JSONB DEFAULT '{}',
        stats JSONB DEFAULT '{
          "totalQuestions": 0,
          "correctAnswers": 0,
          "streak": 0,
          "unitsCompleted": []
        }',
        progress JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

		// Create indexes separately
		await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
		await sql`CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at)`;
		await sql`CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at)`;

		// Create trigger function for updated_at
		await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `;

		// Create trigger (drop first if exists)
		await sql`DROP TRIGGER IF EXISTS update_users_updated_at ON users`;
		await sql`
      CREATE TRIGGER update_users_updated_at 
          BEFORE UPDATE ON users 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column()
    `;

		console.log('✅ Database initialized successfully');
	} catch (error) {
		console.error('❌ Database initialization failed:', error);
		throw error;
	}
}

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication endpoints
app.post('/api/auth/signup', authLimiter, async (req, res) => {
	try {
		const { email, password, name } = req.body;

		// Validation
		if (!email || !password || !name) {
			return res
				.status(400)
				.json({ error: 'Email, password, and name are required' });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: 'Password must be at least 6 characters' });
		}

		// Check if user already exists
		const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
		if (existingUser.length > 0) {
			return res.status(400).json({ error: 'Email already exists' });
		}

		// Hash password
		const passwordHash = await bcrypt.hash(password, 12);

		// Create user
		const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name, profile, stats, progress, created_at
    `;

		const user = result[0];

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET || 'your-secret-key',
			{ expiresIn: '7d' }
		);

		res.status(201).json({
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				profile: user.profile,
				stats: user.stats,
				progress: user.progress,
				createdAt: user.created_at
			}
		});
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validation
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}

		// Get user
		const result = await sql`
      SELECT id, email, name, password_hash, profile, stats, progress, created_at
      FROM users WHERE email = ${email}
    `;

		if (result.length === 0) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const user = result[0];

		// Verify password
		const isValidPassword = await bcrypt.compare(password, user.password_hash);
		if (!isValidPassword) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET || 'your-secret-key',
			{ expiresIn: '7d' }
		);

		res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				profile: user.profile,
				stats: user.stats,
				progress: user.progress,
				createdAt: user.created_at
			}
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Protected user endpoints
app.get(
	'/api/users/profile',
	authenticateToken,
	apiLimiter,
	async (req, res) => {
		try {
			const result = await sql`
      SELECT id, email, name, profile, stats, progress, created_at
      FROM users WHERE id = ${req.userId}
    `;

			if (result.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}

			const user = result[0];
			res.json({
				id: user.id,
				email: user.email,
				name: user.name,
				profile: user.profile,
				stats: user.stats,
				progress: user.progress,
				createdAt: user.created_at
			});
		} catch (error) {
			console.error('Get profile error:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

app.put(
	'/api/users/profile',
	authenticateToken,
	apiLimiter,
	async (req, res) => {
		try {
			const { profile } = req.body;

			await sql`
      UPDATE users 
      SET profile = ${JSON.stringify(profile)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.userId}
    `;

			res.json({ success: true });
		} catch (error) {
			console.error('Update profile error:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

app.put('/api/users/stats', authenticateToken, apiLimiter, async (req, res) => {
	try {
		const { stats } = req.body;

		await sql`
      UPDATE users 
      SET stats = ${JSON.stringify(stats)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.userId}
    `;

		res.json({ success: true });
	} catch (error) {
		console.error('Update stats error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.put(
	'/api/users/progress',
	authenticateToken,
	apiLimiter,
	async (req, res) => {
		try {
			const { progress } = req.body;

			await sql`
      UPDATE users 
      SET progress = ${JSON.stringify(progress)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.userId}
    `;

			res.json({ success: true });
		} catch (error) {
			console.error('Update progress error:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Error handling middleware
app.use((error, req, res, next) => {
	console.error('Unhandled error:', error);
	res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
async function startServer() {
	await initializeDatabase();

	app.listen(PORT, () => {
		console.log(`🚀 Server running on port ${PORT}`);
		console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
	});
}

startServer().catch(console.error);
