import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/users.router";
import { IssuesRouter } from "./modules/Issues/issues.routes";
import { authRoute } from "./modules/auth/auth.route";
import auth from "./middlewere/auth";

const app: Application = express();

// middleware
app.use(express.json());

// Operations
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", userRouter);
app.use("/api/issues", auth(), IssuesRouter);
app.use("/api/auth", auth(), authRoute);

export default app;
