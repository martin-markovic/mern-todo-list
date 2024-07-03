import { Router } from "express";
const mockUserRoutes = Router();

mockUserRoutes.post("/", (req, res) => {
  res.status(201).json({
    // implement sending id and token
    name: req.body.name,
    email: req.body.email,
  });
});

mockUserRoutes.post("/login", (req, res) => {
  res.status(200).json({
    email: req.body.email,
    // implement sending token
  });
});

export default mockUserRoutes;
