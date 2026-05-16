import type { Request, Response } from "express";
import pool from "../../db";
import { sendResponse } from "../../utility/resposneSender";

const getUsers =async (req: Request, res: Response)=>{
    try {
    const result = await pool.query(`
      SELECT * FROM users`);
    sendResponse(res, 200, true, "Users fetched successfully", result.rows);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, 500, false, "Error fetching users", error);
  }
}
const createUsers = async (req: Request, res: Response) => {
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
}

export const userController ={
    getUsers,
    createUsers
}
