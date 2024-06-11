import { Router } from "express";
const router = Router();

import goalRouter from "./goals/goalRoutes.js";
import userRouter from "./users/userRoutes.js";

router.use("/api/goals", goalRouter);
router.use("/api/users", userRouter);

export default router;
