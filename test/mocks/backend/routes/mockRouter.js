import { Router } from "express";

const mockRouter = Router();

mockRouter.use("/api/users", (req, res) => {
  res.status(200).json({
    message: "Users Route",
  });
});

mockRouter.use("/api/goals", (req, res) => {
  res.status(200).json({
    message: "Goals Route",
  });
});

export default mockRouter;
