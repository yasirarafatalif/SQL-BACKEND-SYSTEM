import type { Request, Response } from "express";
import pool from "../../db";
import { sendResponse } from "../../utility/resposneSender";
import { userServices } from "./users.services";


const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    sendResponse(res, 200, true, "Users fetched successfully", result.rows);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, 500, false, "Error fetching users", error);
  }
};
const createUsers = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await userServices.creteUsers(req.body);
    sendResponse(res, 201, true, "User created successfully", result.rows[0]);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, 500, false, "Error creating user", error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = String(id);
  try {
    const result = await userServices.getUserById(userId);
    if (result.rows.length === 0) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User fetched successfully", result.rows[0]);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, 500, false, "Error fetching user", error);
  }
};
const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = String(id);
  const { name, password } = req.body;
  // console.log(req.body);
  try {
    const result = await userServices.updateUserById(req.body, userId);
    if (result.rows.length === 0) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User updated successfully", result.rows[0]);
  } catch (error: any) {
    console.log(error);
    sendResponse(res, 500, false, "Error updating user", error);
  }
};
const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = String(id);
  try {
    const result = await userServices.deleteUserById(userId);

    if (result.rows.length === 0) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User deleted successfully");
  } catch (error: any) {
    console.log(error);
    sendResponse(res, 500, false, "Error deleting user", error);
  }
};

export const userController = {
  getUsers,
  createUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
