import express from "express";

const mockApp = () => {
  const app = express();

  app.use(express.json());

  return app;
};

export default mockApp;
