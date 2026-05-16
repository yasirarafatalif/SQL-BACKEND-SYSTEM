import pool from "../../db";
import type { ProfileUser } from "./profiles.interface";


const getProfilesIntoDb = async () => {
  const result = await pool.query('SELECT * FROM profiles');
  return result;
};


const createProfileIntoDb = async (payload: ProfileUser, ) => {
  const { user_id, bio, address, phone_number, gender } = payload;
  const findUser = await pool.query(
    `
    SELECT * FROM users WHERE id=$1 
    `,
    [user_id],
  );
  if (findUser.rows.length === 0) {
    throw new Error("Users Not found");
  }
  const result = await pool.query(
    `
    INSERT INTO profiles( user_id, bio, address, phone_number, gender ) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [user_id, bio, address, phone_number, gender],
  );

  return result;
};


export const usersProfilesDb = {
  createProfileIntoDb,
  getProfilesIntoDb,
};
