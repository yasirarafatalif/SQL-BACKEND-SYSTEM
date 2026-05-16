import { Router, type Request, type Response } from "express";
import { userController } from "./users.controller";

const router = Router();
router.get("/", userController.getUsers);
router.post("/", userController.createUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export const userRoute = router;