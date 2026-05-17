import pool from "../../db";
import type { UserFindById, UserRequestBody } from "./users.interface";
import bcrypt from "bcryptjs";

const getUsers = async () => {
  const result = await pool.query(`
    SELECT * FROM users`);
  result.rows.forEach((user) => delete user.password);
  return result;
};
const creteUsers = async (playload: UserRequestBody) => {
  const { name, email, password } = playload;
  const hashPassword = bcrypt.hashSync(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email,password) VALUES ($1,$2,$3) 
      RETURNING *`,
    [name, email, hashPassword],
  );
  delete result.rows[0].password;
  return result;
};
const getUserById = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1`,
    [id],
  );
  delete result.rows[0].password;
  return result;
};
const updateUserById = async (playload: UserFindById, id: string) => {
  const { name, password } = playload;
  const result = await pool.query(
    "UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *",
    [name, password, id],
  );
  return result;
};
const deleteUserById = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id =$1 RETURNING *",
    [id],
  );
  return result;
};

export const userServices = {
  getUsers,
  creteUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
