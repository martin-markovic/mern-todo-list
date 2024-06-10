// Sample data for demo
let goals = [
  { id: 1, title: "Goal 1", completed: false },
  { id: 2, title: "Goal 2", completed: true },
];

// POST create a new goal
export const addGoal = (req, res) => {
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
};

// GET all goals
export const getGoals = (req, res) => {
  res.json(goals);
};

// GET goal by id
export const getGoalById = (req, res) => {
  const goalId = parseInt(req.params.id);

  if (goalId > goals.length) {
    return res.sendStatus(404);
  } else {
    const singleGoal = goals.find((goal) => goal.id === goalId);

    res.json(singleGoal);
  }
};

// PUT update a goal by id
export const updateGoal = (req, res) => {
  const goalId = parseInt(req.params.id);
  const goalIndex = goals.findIndex((goal) => goal.id === goalId);

  if (goalIndex < 0) {
    return res.status(404).json({ message: "Goal not found" });
  }

  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Please add title" });
  }

  goals[goalIndex] = {
    ...goals[goalIndex],
    title,
    completed: completed || false,
  };

  res.json(goals[goalIndex]);
};

// DELETE goal by id
export const deleteGoal = (req, res) => {
  const goalId = parseInt(req.params.id);
  console.log(goalId);

  goals = goals.filter((goal) => goal.id !== goalId);
  res.sendStatus(204);
};
