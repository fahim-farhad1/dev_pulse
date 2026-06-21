import { pool } from "../../DB";
import bcrypt from "bcrypt";
import type { Iauth } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config/index.env";

const loginUserIntoDb = async (payload: Iauth) => {
  const { email, password } = payload;
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  const user = result.rows[0];
  if (result.rows.length === 0) {
    throw new Error("Invalid Credential");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password Invalid");
  }

  const JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  console.log(JwtPayload);

  const accessToken = jwt.sign(JwtPayload, config.secret as string, { expiresIn: "1d" });

  return accessToken;
};

export const authService = {
  loginUserIntoDb,
};
