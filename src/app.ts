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

app.use("/api/users", userRoute);
app.use("/api/users", userRoute);
app.use("/api/users", userRoute);
app.use("/api/users", userRoute);
app.use("/api/users",userRoute );

export default app;
