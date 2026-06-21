import { pool } from "../../DB";
import type { Iuser } from "../users/user.interface";

const createIssuesIntoDb = async (user: Iuser, payload: any) => {
  console.log("payload", payload);
  const userId = user.id;
  const { title, description, type } = payload;
  try {
    const result = await pool.query(
      `
        INSERT INTO issues (userId,title, description, type) VALUES ($1,$2,$3,$4) RETURNING *
        `,
      [userId, title, description, type],
    );
    console.log("data create successfully");
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const issuesService = {
  createIssuesIntoDb,
};
