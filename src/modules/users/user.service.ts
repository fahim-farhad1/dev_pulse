import { pool } from "../../DB";
import type { Iuser } from "./user.interface";
import bcrypt from "bcrypt";

// create user
const createUserIoDB = async (payLoad: Iuser) => {
  const { name, email, password } = payLoad;
  const role = payLoad.role ?? "contributor";
  const hashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, role ) VALUES ($1,$2,$3,$4) RETURNING *
        `,
    [name, email, hashPass, role],
  );
  return result;
};

const getAllUsersIntoDB = async () => {
  const result = await pool.query(`
        SELECT * FROM users
        `);
  //   console.log(result);
  return result.rows;
};

export const userService = {
  createUserIoDB,
  getAllUsersIntoDB,
};
