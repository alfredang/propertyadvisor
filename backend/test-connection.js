import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
console.log('Testing connection with:', connectionString ? connectionString.substring(0, 20) : 'UNDEFINED');

const pool = new Pool({ connectionString });

try {
    const res = await pool.query('SELECT NOW()');
    console.log('Success:', res.rows[0]);
} catch (err) {
    console.error('Failure:', err);
} finally {
    await pool.end();
}
