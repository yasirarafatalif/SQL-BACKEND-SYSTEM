import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import pool from "../db";
import type { ROLES } from "../types";
const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided.",
        });
      }

      let decodedToken: JwtPayload;

      try {
        decodedToken = jwt.verify(token, config.secret as string) as JwtPayload;
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token.",
        });
      }
      const user = decodedToken;
      const email = decodedToken.email;

      const findUser = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
      );

      if (findUser.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbiden Access",
        });
      }

      next();
    } catch (error: any) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
};

export default auth;
