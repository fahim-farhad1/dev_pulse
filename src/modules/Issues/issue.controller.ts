import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  const result = await issuesService.createIssuesIntoDb(req.body);
  console.log("controller",result);
};

export const IssuesController = {
  createIssues,
};
