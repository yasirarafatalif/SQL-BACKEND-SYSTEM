import pool from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const getLoginIntoDb = async (playload: {
  email: string;
  password: string;
}) => {
  const { email, password } = playload;
  const findUser = await pool.query(`SELECT * FROM users WHERE email = $1 `, [
    email,
  ]);
  const user = findUser.rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const ispPasseordMatch = await bcrypt.compare(password, user.password);
  if (!ispPasseordMatch) {
    throw new Error("Invalid password");
  }
  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};

export const authService = {
  getLoginIntoDb,
};
