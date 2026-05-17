import type { Request, Response } from "express";
import { sendResponse } from "../../utility/resposneSender";
import { authService } from "./auth.services";

const login= async (req:Request, res:Response)=>{
    try {
        const result = await authService.getLoginIntoDb(req.body);
        sendResponse(res, 200, true, "Login successful", result);
        
    } catch (error:any) {
        console.log(error)
        sendResponse(res, 404, false, "Error fetching users", error);
        
    }
}

export const authController = {login};