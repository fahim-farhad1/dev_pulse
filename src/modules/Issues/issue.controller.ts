import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.createIssuesIntoDb(req.user, req.body);
    const issue = result?.rows[0];
    return res.status(200).json({
      success: true,
      message: "Issue created successfully",
      data: {
        id: ` ${issue.id} `,
        title: ` ${issue.title}`,
        description: ` ${issue.description} `,
        type: ` ${issue.type} `,
        status: ` ${issue.status} `,
        reporter_id: ` ${issue.reporter_id} `,
        created_at: ` ${issue.created_at} `,
      },
    });
  } catch (error) {}
};
const updateIssue = async (req: Request, res: Response) => {
  const id = req.params?.id;
  try {
    const result = await issuesService.updateIssueIntoDb(
      id as string,
      req.body,
    );
    const data = result.rows[0];
    console.log("data", data);
    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: {
        id: `${data.id}`,
        title: `${data.title}`,
        description: `${data.description}`,
        type: `${data.type}`,
        status: `${data.status}`,
        reporter_id: `${data.reporter_id}`,
        created_at: `${data.created_at}`,
        updated_at: `${data.updated_at}`,
      },
    });
  } catch (error) {}
};

export const IssuesController = {
  createIssues,
  updateIssue,
};
