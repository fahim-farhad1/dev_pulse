import type { Request, Response } from "express";
import { authService } from "./auth.service";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDb(req.body);
    console.log(result)
    const user = result
    const accessTokenDecode = jwt.decode(result,)

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: result,
        // user: {
        //   id: `${user.id}`,
        //   name: `${user.name}`,
        //   email: `${user.email}`,
        //   role: `${user.role}`,
        //   created_at: `${user.created_at}`,
        //   // updated_at: "2026-01-20T09:00:00Z",
        // },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      //   error: error,
    });
  }
};

export const authController = {
  loginUser,
};
