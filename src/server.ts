import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import { sendResponse } from "./utility/resposneSender";
const app: Application = express();
const port = 3000;
app.use(express.json());
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_okhD8s1Kzewg@ep-lively-bonus-ap2g2poz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDb = async () => {
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
initDb();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is Runnig",
  });
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email,password) VALUES ($1,$2,$3) 
      RETURNING *`,
      [name, email, password],
    );
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users`);
      sendResponse(res, 200, true, "Users fetched successfully", result.rows);
    // res.status(200).json({
    //   success: true,
    //   message: "Users fetched successfully",
    //   result: result.rows,
    // });
  } catch (error: any) {
    console.error(error);
    sendResponse(res, 500, false, "Error fetching users", error);
    // res.status(500).json({ error: error });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      result: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
