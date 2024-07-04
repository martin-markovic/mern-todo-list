import { Router } from "express";
import { mockProtect } from "../../middleware/mockAuthMiddleware.js";
import mockDB from "../../config/mockDB.js";

const mockGoalRoutes = Router();

mockGoalRoutes.post("/", mockProtect, (req, res) => {
  return res.status(201).json({
    user: req.user.id,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
  });
});

mockGoalRoutes.get("/", mockProtect, (req, res) => {
  const goals = mockDB.find("goals", { id: req.user.id });

  return res.status(200).json({
    goals: [...goals],
  });
});

mockGoalRoutes.get("/:id", mockProtect, (req, res) => {
  const goal = mockDB.findOne("goals", {
    id: parseInt(req.params.id, 10),
  })[0];

  if (!goal) return res.status(404).json({ message: "Goal not found" });

  if (goal.id !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  return res.status(200).json({
    id: goal.id,
    user: goal.user,
    text: goal.text,
    isCompleted: goal.isCompleted,
  });
});

mockGoalRoutes.put("/:id", mockProtect, (req, res) => {
  if (!req.body.text) {
    return res.status(404).json({ message: "Please add a text field" });
  }

  const goal = mockDB.findOne("goals", {
    id: parseInt(req.params.id, 10),
  })[0];

  if (!goal) return res.status(404).json({ message: "Goal not found" });

  if (goal.id !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  return res.status(200).json({
    id: req.params.id,
    user: req.user.id,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
  });
});

mockGoalRoutes.delete("/:id", mockProtect, (req, res) => {
  const goal = mockDB.findOne("goals", {
    id: parseInt(req.params.id, 10),
  })[0];

  if (!goal) return res.status(404).json({ message: "Goal not found" });

  if (goal.id !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  return res.status(200).json({
    id: goal.id,
  });
});

export default mockGoalRoutes;
