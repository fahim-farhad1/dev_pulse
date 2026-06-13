import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = 3000;

app.use(express.json());

// connectionString

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_9CkYaRW1gZyH@ep-super-morning-ap6blemq-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY ,
            name VARCHAR(50),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(30) DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW()
    )
            `);
    console.log("database connected successfully!");
  } catch (error) {}
};

initDB();

const updateDB = async () => {
  try {
    await pool.query(`
            ALTER TABLE users RENAME COLUMN create_at TO created_at
            `);
  } catch (error) {
    console.log(error);
  }
};

updateDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *
        `,
    [name, email, password],
  );
  console.log(result);
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
