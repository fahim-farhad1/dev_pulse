import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/signup", userController.createUser);

router.get('/',userController.getAllUser)
export const userRouter = router;
