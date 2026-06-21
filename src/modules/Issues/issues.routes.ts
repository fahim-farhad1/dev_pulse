import { Router } from "express";
import { IssuesController } from "./issue.controller";

const router = Router()

router.post('/create',IssuesController.createIssues)
router.put('/update/:id', IssuesController.updateIssue)

export const IssuesRouter = router