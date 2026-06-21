import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.env";
import { pool } from "../DB";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    console.log(token);
    const decode = jwt.verify(token as string, config.secret as string);
    // console.log(decode);
    const userData = await pool.query(
      `
        SELECT * FROM  users WHERE email=$1
        `,
      [decode.email],
    );
    // console.log(userData.rows[0], "userData");
    const user = userData.rows[0];
    if (!user) {
      res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    req.user = decode;

    next();
  };
};

export default auth;
