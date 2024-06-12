import { Router } from "express";
const userRouter = Router();

import {
  registerUser,
  loginUser,
  getUser,
} from "../../controller/users/userController.js";

import protect from "../../middleware/authMiddleware.js";

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getUser);

export default userRouter;
