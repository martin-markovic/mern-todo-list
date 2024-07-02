import express from "express";
import mockRouter from "./routes/mockRouter.js";

const mockApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/", mockRouter);

  return app;
};

export default mockApp;
