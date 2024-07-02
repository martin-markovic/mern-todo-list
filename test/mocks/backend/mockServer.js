import express from "express";

const mockApp = () => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello Test" });
  });

  return app;
};

export default mockApp;
