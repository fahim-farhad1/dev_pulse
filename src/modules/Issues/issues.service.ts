import { pool } from "../../DB";
import type { Iuser } from "../users/user.interface";

const createIssuesIntoDb = async (reporter_id: Iuser, payload: any) => {
  console.log("payload", reporter_id);
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

const updateIssueIntoDb = async (
  reporter_id: Iuser,
  role: string,
  id: string,
  payLoad: any,
) => {
  const { title, description, type } = payLoad;
  const updated_at = new Date();
  console.log("update_at", updated_at);
  if (role === "maintainer") {
    const result = await pool.query(
      `
        UPDATE issues SET title=COALESCE($1, title) , description=COALESCE($2, description), type=COALESCE($3, type), updated_at=$4  WHERE id=$5 RETURNING *
        `,
      [title, description, type, updated_at, id],
    );
    if (result.rowCount === 0) {
      throw new Error("Issue not found or you are not authorized to update it");
    }
    return result;
  } else {
    const result = await pool.query(
      `
        UPDATE issues SET title=COALESCE($1, title) , description=COALESCE($2, description), type=COALESCE($3, type), updated_at=$4  WHERE id=$5 AND reporter_id=$6 RETURNING *
        `,
      [title, description, type, updated_at, id, reporter_id],
    );
    if (result.rowCount === 0) {
      throw new Error("Issue not found or you are not authorized to update it");
    }
    return result;
  }
};

const getAllIssuesIntoDb = async () => {
  const result = pool.query(`
    SELECT * FROM issues 
    `);
  return result;
};

const getSingleIssueIntoDb = async (id: string) => {
  try {
    const result = await pool.query(
      `
    SELECT  i.*, u.name, u.role FROM issues i JOIN users u ON i.reporter_id = u.id WHERE i.id=$1
    `,
      [id],
    );
    return result;
  } catch (error) {
    // throw new Error(`${error}`)
    console.log(error);
  }
};

const deleteIssueIntoDB = async (role: string, id: string) => {
  console.log("db Role", role);
  try {
    if (role === "maintainer") {
      const result = await pool.query(
        `
      DELETE FROM issues WHERE id=$1 RETURNING *
      `,
        [id],
      );
      return result;
    } else throw new Error("you are not maintainer!");
  } catch (error) {
    throw Error
  }
};

export const issuesService = {
  createIssuesIntoDb,
  updateIssueIntoDb,
  getAllIssuesIntoDb,
  getSingleIssueIntoDb,
  deleteIssueIntoDB,
};
