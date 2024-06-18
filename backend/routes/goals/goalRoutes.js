import { Router } from "express";
const goalRouter = Router();

import {
  addGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "../../controller/goals/goalController.js";
import protect from "../../middleware/authMiddleware.js";

goalRouter.route("/").get(protect, getGoals).post(protect, addGoal);
goalRouter
  .route("/:id")
  .get(protect, getGoalById)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

export default goalRouter;
