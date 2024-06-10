import { Router } from "express";

const router = Router();

// Sample data for demo
let goals = [
  { id: 1, title: "Goal 1", completed: false },
  { id: 2, title: "Goal 2", completed: true },
];

// POST create a new goal
router.post("/", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(404).json({ message: "Please add a title" });
  }

  const newGoal = {
    id: goals.length + 1,
    title,
    completed: completed || false,
  };

  goals.push(newGoal);
  res.status(201).json(newGoal);
});

// GET all goals
router.get("/", (req, res) => {
  res.json(goals);
});

// GET goal by id
router.get("/:id", (req, res) => {
  const goalId = parseInt(req.params.id);
  const singleGoal = goals.find((goal) => goal.id === goalId);

  if (!singleGoal) {
    return res.status(404);
  }

  res.json(singleGoal);
});

// PUT update a goal by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`PUT /api/goals/${id}`);

  res.status(200);
  res.send(`Update a goal with id of${id}`);
});

// DELETE goal by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/goals/${id}`);

  res.status(200);
  res.send(`Delete a goal with id of ${id}`);
});

export default router;
