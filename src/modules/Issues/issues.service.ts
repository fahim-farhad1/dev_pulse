import { pool } from "../../DB";
import type { Iuser } from "../users/user.interface";

const createIssuesIntoDb = async (user: Iuser, payload: any) => {
  console.log("payload", payload);
  const reporter_id = user.id;
  const created_at = new Date()
  const status = "open";
  const { title, description, type } = payload;
  try {
    const result = await pool.query(
      `
        INSERT INTO issues (reporter_id,title, description, type, created_at, status) VALUES ($1,$2,$3,$4, $5, $6) RETURNING *
        `,
      [reporter_id, title, description, type, created_at, status],
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
