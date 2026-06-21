import app from "./app";
import config from "./config/index.env";
import { createIssueTable, initDB } from "./DB";

const main = () => {
  const port = config.port;

  // server Call
  initDB();
  createIssueTable();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
