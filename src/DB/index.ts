import { Pool } from "pg";
import config from "../config/index.env";

export const pool = new Pool({
  connectionString: config.connection_String,
});

export const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY ,
            name VARCHAR(50),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(30) DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW()
    )
            `);
    console.log("database connected successfully!");
  } catch (error) {
    
  }
};
