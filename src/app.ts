import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import { sendResponse } from "./utility/resposneSender";
import config from "./config";
import pool from "./db";
import { userRoute } from "./modules/users/users.route";
const app: Application = express();
app.use(express.json());




app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is Runnig",
  });
});

app.post("/api/users", userRoute);

app.use("/api/users", userRoute);



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

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password } = req.body;
  // console.log(req.body);
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *",
      [name, password, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error: any) {
    console.log(error);
    sendResponse(res, 500, false, "Error updating user", error);
  }
});
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id =$1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    sendResponse(res, 200, true, "User deleted successfully");
  } catch (error: any) {
    console.log(error);
    sendResponse(res, 500, false, "Error deleting user", error);
  }
});

export default app;
