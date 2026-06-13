import { pool } from "../../DB";
import type { Iuser } from "./user.interface";

const createUserIoDB = async (payLoad: Iuser) => {
  const { name, email, password } = payLoad;
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *
        `,
    [name, email, password],
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
