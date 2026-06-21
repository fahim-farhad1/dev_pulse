import { Router } from "express";
import { IssuesController } from "./issue.controller";

const router = Router()

router.post('/',IssuesController.createIssues)

export const IssuesRouter = router