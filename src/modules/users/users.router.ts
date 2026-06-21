import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/signup", userController.createUser);
// router.post("/login", userController.loginUsers);
router.get('/',userController.getAllUser)
export const userRouter = router;
