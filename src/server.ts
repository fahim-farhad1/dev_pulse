import app from "./app";
import config from "./config/index.env";
import { initDB, updateDb } from "./DB";

const main = () => {
  const port = config.port;

  // server Call
  initDB();
  updateDb()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
