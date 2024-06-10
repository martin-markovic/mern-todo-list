import { Router } from "express";
const goalRouter = Router();

import {
  addGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "../../controller/goals/goalController.js";

goalRouter.route("/").get(getGoals).post(addGoal);
goalRouter.route("/:id").get(getGoalById).put(updateGoal).delete(deleteGoal);

export default goalRouter;
