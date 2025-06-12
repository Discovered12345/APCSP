/**
 * Database Migration Script for APCSP Practice Platform
 *
 * This script handles database migrations using Neon PostgreSQL.
 * It reads SQL files from the migrations/ directory and executes them
 * in order, keeping track of which migrations have been run.
 *
 * Usage: npm run migrate
 */

import pg from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

async function runMigrations() {
	// Database connection
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	});

	const databaseUrl = process.env.DATABASE_URL;

	if (!databaseUrl) {
		console.error('❌ Error: DATABASE_URL not found in environment variables');
		console.log('\n📝 Create a .env file with:');
		console.log('DATABASE_URL=your_neon_connection_string_here');
		process.exit(1);
	}

	try {
		console.log('🔌 Connecting to database...');
		await client.connect();
		console.log('✅ Connected to database successfully!');

		// Create migrations table if it doesn't exist
		console.log('\n📋 Setting up migrations table...');
		await client.query(`
			CREATE TABLE IF NOT EXISTS migrations (
				id SERIAL PRIMARY KEY,
				filename VARCHAR(255) UNIQUE NOT NULL,
				executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`);

		// Get list of migration files
		const migrationsDir = join(__dirname, '..', 'migrations');
		const migrationFiles = readdirSync(migrationsDir)
			.filter((file) => file.endsWith('.sql'))
			.sort();

		if (migrationFiles.length === 0) {
			console.log('⚠️  No migration files found in migrations/ directory');
			return;
		}

		// Get executed migrations
		const executedMigrations = await client.query(
			'SELECT filename FROM migrations ORDER BY id'
		);
		const executedFilenames = executedMigrations.rows.map(
			(row) => row.filename
		);

		console.log(`\n📁 Found ${migrationFiles.length} migration file(s)`);
		console.log(`✅ ${executedFilenames.length} already executed`);

		// Run pending migrations
		let newMigrations = 0;
		for (const filename of migrationFiles) {
			if (!executedFilenames.includes(filename)) {
				console.log(`\n🔄 Running migration: ${filename}`);

				const migrationPath = join(migrationsDir, filename);
				const migrationSql = readFileSync(migrationPath, 'utf8');

				// Execute migration in a transaction
				await client.query('BEGIN');
				try {
					await client.query(migrationSql);
					await client.query('INSERT INTO migrations (filename) VALUES ($1)', [
						filename
					]);
					await client.query('COMMIT');
					console.log(`✅ Completed: ${filename}`);
					newMigrations++;
				} catch (error) {
					await client.query('ROLLBACK');
					console.error(
						`❌ Failed to run migration ${filename}:`,
						error.message
					);
					throw error;
				}
			}
		}

		if (newMigrations === 0) {
			console.log('\n🎉 All migrations are up to date!');
		} else {
			console.log(`\n🎉 Successfully ran ${newMigrations} new migration(s)!`);
		}

		// Show table summary
		console.log('\n📊 Database summary:');
		const tables = await client.query(`
			SELECT table_name 
			FROM information_schema.tables 
			WHERE table_schema = 'public' 
			ORDER BY table_name
		`);

		for (const table of tables.rows) {
			const count = await client.query(
				`SELECT COUNT(*) FROM ${table.table_name}`
			);
			console.log(`   📋 ${table.table_name}: ${count.rows[0].count} rows`);
		}
	} catch (error) {
		console.error('\n❌ Migration failed:', error.message);
		console.log('\n🔧 Troubleshooting tips:');
		console.log('   1. Check your database connection string');
		console.log('   2. Ensure your Neon database is active');
		console.log('   3. Verify network connectivity');
		console.log('   DATABASE_URL=your_neon_connection_string');
		process.exit(1);
	} finally {
		await client.end();
		console.log('\n🔌 Database connection closed');
	}
}

// Add to package.json scripts helper
function showUsageInfo() {
	console.log('\n📖 Usage Information:');
	console.log('   node scripts/migrate.js    - Run all pending migrations');
	console.log('\n📝 To add this to package.json scripts:');
	console.log('   "migrate": "node scripts/migrate.js"');
	console.log('\n🔧 Environment Setup:');
	console.log('   Add to your .env file:');
	console.log('   DATABASE_URL=your_neon_connection_string');
}

// Run migrations
runMigrations()
	.then(() => {
		showUsageInfo();
		console.log('\n✨ Migration process completed successfully!');
		process.exit(0);
	})
	.catch((error) => {
		console.error('❌ Migration process failed:', error);
		process.exit(1);
	});
