import { pool } from "../../DB";
import type { Iuser } from "../users/user.interface";

const createIssuesIntoDb = async (user: Iuser, payload: any) => {
  console.log("payload", payload);
  const reporter_id = user.id;
  const created_at = new Date();
  const status = "open";
  const { title, description, type, updated_at } = payload;
  try {
    const result = await pool.query(
      `
        INSERT INTO issues (reporter_id,title, description, type, created_at, status, updated_at) VALUES ($1,$2,$3,$4, $5, $6, $7) RETURNING *
        `,
      [reporter_id, title, description, type, created_at, status, updated_at],
    );
    console.log("data create successfully");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateIssueIntoDb = async (id: string, payLoad: any) => {
  const { title, description, type } = payLoad;
  const updated_at = new Date()
  console.log("update_at", updated_at)

  const result = await pool.query(
    `
        UPDATE issues SET title=$1, description=$2, type=$3,updated_at=$4  WHERE id=$5 RETURNING *
        `,
    [title, description, type, updated_at, id],
  );

  return result;
};
export const issuesService = {
  createIssuesIntoDb,
  updateIssueIntoDb,
};
