import type { Request, Response } from "express";
import { userService } from "./user.service";

// create User function
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIoDB(req.body);
    console.log(result.rows[0]);
    res.status(200).json({
      message: "User Create successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersIntoDB();
    console.log("result", result);
    res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
};
