import pg from 'pg';
import { config } from 'dotenv';

const { Client } = pg;
config();

async function resetDatabase() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	});

	try {
		console.log('🔌 Connecting to database...');
		await client.connect();
		console.log('✅ Connected to database successfully!');

		console.log('🗑️ Dropping existing tables...');
		await client.query('DROP TABLE IF EXISTS users CASCADE');
		await client.query('DROP TABLE IF EXISTS migrations CASCADE');

		console.log('🏗️ Creating users table with new schema...');
		await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        profile JSONB DEFAULT '{
          "avatar": "",
          "bio": "",
          "preferences": {
            "theme": "light",
            "notifications": true
          }
        }',
        stats JSONB DEFAULT '{
          "totalQuestions": 0,
          "correctAnswers": 0,
          "streak": 0,
          "unitsCompleted": []
        }',
        progress JSONB DEFAULT '{
          "toolsUsed": 0,
          "recentActivities": [
            {
              "action": "Welcome to APCSP Practice! Start by exploring the units.",
              "time": "Just now",
              "type": "welcome",
              "color": "blue"
            }
          ],
          "unitsProgress": {},
          "flashcardsProgress": {}
        }',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

		console.log('📇 Creating indexes...');
		await client.query('CREATE INDEX idx_users_email ON users(email)');
		await client.query(
			'CREATE INDEX idx_users_created_at ON users(created_at)'
		);
		await client.query(
			'CREATE INDEX idx_users_updated_at ON users(updated_at)'
		);

		console.log('⚙️ Creating trigger function...');
		await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `);

		console.log('🔗 Creating trigger...');
		await client.query(`
      CREATE TRIGGER update_users_updated_at 
          BEFORE UPDATE ON users 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column()
    `);

		console.log('📋 Creating migrations table...');
		await client.query(`
      CREATE TABLE migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

		console.log('✅ Database reset complete!');
	} catch (error) {
		console.error('❌ Reset failed:', error.message);
		throw error;
	} finally {
		await client.end();
		console.log('🔌 Database connection closed');
	}
}

resetDatabase()
	.then(() => {
		console.log(
			'🎉 Database reset successfully! You can now run npm run migrate'
		);
		process.exit(0);
	})
	.catch((error) => {
		console.error('❌ Reset failed:', error);
		process.exit(1);
	});
