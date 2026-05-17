import pool from "../../db";
import bcrypt from "bcryptjs";
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
   delete user.password;
  return user;
};

export const authService = {
  getLoginIntoDb,
};
