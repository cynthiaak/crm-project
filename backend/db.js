require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST || '127.0.0.1',
  port: Number(process.env.PG_PORT || 5432),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD,       // set in .env
  database: process.env.PG_DATABASE || 'CRM',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('connect', () => console.log('✅ Connected to PostgreSQL pool'));
pool.on('error', (err) => console.error('❌ PostgreSQL pool error', err));

module.exports = pool;
