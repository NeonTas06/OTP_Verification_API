import express from "express";
import bodyParser from "body-parser";
import proRouter from "./Router/proRouter.js";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use("/otp", proRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
