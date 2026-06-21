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
            password TEXT NOT NULL,
            role VARCHAR(30)
            NOT NULL
            DEFAULT 'contributor'
            CHECK (role IN ('contributor', 'maintainer')),
            created_at TIMESTAMP DEFAULT NOW()
    )
            `);
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const createIssueTable = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        reporter_id INT,
        title VARCHAR(200),
        description TEXT,
        type VARCHAR(20),
        status VARCHAR(20),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
        )
        `);
    console.log("data create successfully");
  } catch (error) {
    console.log(error);
  }
};
