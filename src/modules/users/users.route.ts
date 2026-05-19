import { Router, type Request, type Response } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();
router.get("/", auth(USER_ROLE.admin), userController.getUsers);
router.post("/", userController.createUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export const userRoute = router;