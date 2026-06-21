import type { Request, Response } from "express";
import { userService } from "./user.service";
// import bcrypt from "bcrypt";

// create User function
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIoDB(req.body);
    const user = result.rows[0];
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: `${user.id}`,
        name: `${user.name}`,
        email: `${user.email}`,
        role: `${user.role}`,
        created_at: `${user.created_at}`,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// const loginUsers = async (req: Request, res: Response) => {
//   try {
//     const { password, email } = req.body;
//     const result = await userService.loginUserIntoDb(email);
//     const user = result.rows[0];
//     if (!user) {
//       return res.status(401).json({
//         status: false,
//         message: "Invalid user name",
//       });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         status: false,
//         message: "Invalid password",
//       });
//     }
//     // console.log(isMatch);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: {
//         token: "",
//         user: {
//           id: `${user.id}`,
//           name: `${user.name}`,
//           email: `${user.email}`,
//           role: `${user.role}`,
//           created_at: `${user.created_at}`,
//           // updated_at: "2026-01-20T09:00:00Z",
//         },
//       },
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//       error: error,
//     });
//   }
// };

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersIntoDB();
    console.log("result", result);
    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  // loginUsers,
};
