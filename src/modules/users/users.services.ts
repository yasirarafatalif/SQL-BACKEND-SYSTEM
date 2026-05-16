import pool from "../../db";
import type { UserFindById, UserRequestBody } from "./users.interface";

const getUsers = async () => {
  const result = await pool.query(`
    SELECT * FROM users`);
  return result;
};
const creteUsers = async (playload: UserRequestBody) => {
  const { name, email, password } = playload;
  const result = await pool.query(
    `INSERT INTO users (name, email,password) VALUES ($1,$2,$3) 
      RETURNING *`,
    [name, email, password],
  );
  return result;
};
const getUserById = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1`,
    [id],
  );
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
