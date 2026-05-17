import type { Request, Response } from "express";
import { usersProfilesDb } from "./profiles.services";
import { sendResponse } from "../../utility/resposneSender";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await usersProfilesDb.getProfilesIntoDb();
    res.status(200).json({
      success: true,
      message: "Profile Views",
      data: result.rows,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersProfilesDb.createProfileIntoDb(req.body);
    res.status(200).json({
      success: true,
      message: "Profile Create Successfully ",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userProfiles = {
  createUser,
  getUser,
};
