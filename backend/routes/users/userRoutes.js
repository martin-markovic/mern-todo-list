import { Router } from "express";
const userRouter = Router();

import {
  registerUser,
  loginUser,
  getUser,
} from "../../controller/users/userController.js";

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", getUser);

export default userRouter;
