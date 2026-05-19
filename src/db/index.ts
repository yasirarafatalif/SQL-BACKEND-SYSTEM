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
            password TEXT NOT NULL,
            role VARCHAR(10) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);

    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      bio TEXT,
      address TEXT,
      phone_number VARCHAR(15),
      gender VARCHAR (10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `,
    );
    console.log("database connects successfully ");
  } catch (error) {
    console.log(error);
  }
};

export default pool;
