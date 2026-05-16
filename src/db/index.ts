import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  connectionString: `${config.connection_string}`,
});

export const initDb = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);
    console.log("database connects successfully ");
  } catch (error) {
    console.log(error);
  }
};

export default pool;