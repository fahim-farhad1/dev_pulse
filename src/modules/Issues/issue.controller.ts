import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.createIssuesIntoDb(
      req.user.id,
      req.body,
    );
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
      req.user.id,
      req.user.role,
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
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesIntoDb();
    res.status(200).json({
      status: true,
      message: "Issues retrived successfully",
      data: [result.rows],
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Data not found!",
      errors: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getSingleIssueIntoDb(
      req.params.id as string,
    );
    const data = result?.rows[0];
    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
      data: {
        id: `${data.id}`,
        title: `${data.title}`,
        description: `${data.description}`,
        type: `${data.type}`,
        status: `${data.status}`,
        reporter: {
          id: `${data.id}`,
          name: `${data.name}`,
          role: `${data.role}`,
        },
        created_at: `${data.created_at}`,
        updated_at: `${data.updated_at}`,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
   const result = await issuesService.deleteIssueIntoDB(
      req.user.role,
      req.params.id as string,
    );

    if (result?.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Not authorized or issue not found",
      });
    }
   return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
   return res.status(403).json({
      status: false,
      message: error,
    });
  }
};

export const IssuesController = {
  createIssues,
  updateIssue,
  getAllIssues,
  getSingleIssue,
  deleteIssue,
};
