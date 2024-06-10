import { Router } from "express";
const router = Router();

import goalRouter from "./goals/goalRoutes.js";

router.use("/api/goals", goalRouter);

export default router;
