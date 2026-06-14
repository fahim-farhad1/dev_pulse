import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/users.router";

const app: Application = express();

// middleware
app.use(express.json());

// Operations
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth/signup", userRouter);


export default app;
