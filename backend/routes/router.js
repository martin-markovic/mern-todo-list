import { Router } from "express";

const router = Router();

router.post("/add", (req, res) => {
  console.log("POST /api/goals/add");

  res.status(201);
  res.send("Add new goal");
});

router.get("/", (req, res) => {
  console.log("GET /api/goals");

  res.status(200);
  res.send("Get all goals");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`PUT /api/goals/${id}`);

  res.status(200);
  res.send(`Update a goal with id of ${id}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/goals/${id}`);

  res.status(200);
  res.send(`Delete a goal with id of ${id}`);
});

export default router;
