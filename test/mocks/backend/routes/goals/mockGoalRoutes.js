import { Router } from "express";
import { mockProtect } from "../../middleware/mockAuthMiddleware.js";
import {
  mockAddGoal,
  mockGetGoals,
  mockGetGoalById,
  mockUpdateGoal,
  mockDeleteGoal,
} from "../../controller/goals/mockGoalController.js";

const mockGoalRoutes = Router();

mockGoalRoutes.post("/", mockProtect, mockAddGoal);

mockGoalRoutes.get("/", mockProtect, mockGetGoals);

mockGoalRoutes.get("/:id", mockProtect, mockGetGoalById);

mockGoalRoutes.put("/:id", mockProtect, mockUpdateGoal);

mockGoalRoutes.delete("/:id", mockProtect, mockDeleteGoal);

export default mockGoalRoutes;
