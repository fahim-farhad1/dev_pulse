import { Router } from "express";
import { IssuesController } from "./issue.controller";
import auth from "../../middlewere/auth";

const router = Router()

router.post('/create',auth(),IssuesController.createIssues)
router.put('/update/:id', auth(),IssuesController.updateIssue)
router.get('/', IssuesController.getAllIssues)

export const IssuesRouter = router