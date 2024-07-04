import { Router } from "express";
import { mockProtect } from "../../middleware/mockAuthMiddleware.js";

const mockUserRoutes = Router();

mockUserRoutes.post("/", mockProtect, (req, res) => {
  res.status(201).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    token: req.user.token,
  });
});

mockUserRoutes.post("/login", mockProtect, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    token: req.user.token,
  });
});

export default mockUserRoutes;
