import { Router, type Request, type Response } from "express";
import pool from "../../db";
import { sendResponse } from "../../utility/resposneSender";
import { userController } from "./users.controller";

const router = Router();
router.get("/", userController.getUsers);
router.post("/", userController.createUsers);

export const userRoute = router;