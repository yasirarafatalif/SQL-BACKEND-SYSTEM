import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/users.route";
import { profileRoute } from "./modules/profiles/profiles.routes";
import { authRoute } from "./modules/auth/auth.routes";
import logger from "./middleware/logger";
import globalerrorhandeler from "./middleware/globalErrorHandeler";


const app: Application = express();
app.use(express.json());
app.use(logger);
app.use(globalerrorhandeler.globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is Runnig",
  });
});



app.use("/api/users/profiles", profileRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

export default app;
