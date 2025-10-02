import { config } from 'dotenv';
import { initializePool } from './src/db.js';
config({ path: '.env.test' });
initializePool();
