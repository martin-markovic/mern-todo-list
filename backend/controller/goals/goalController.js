import Goal from "../../models/goalModel.js";

// POST create a new goal
export const addGoal = async (req, res) => {
  const { title, completed } = req.body;

  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET goal by id
export const getGoalById = async (req, res) => {
  try {
    const goalId = parseInt(req.params.id);

    if (goalId > goals.length) {
      return res.sendStatus(404);
    } else {
      const singleGoal = goals.find((goal) => goal.id === goalId);

      res.json(singleGoal);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update a goal by id
export const updateGoal = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE goal by id
export const deleteGoal = async (req, res) => {
  try {
    const goalId = parseInt(req.params.id);
    console.log(goalId);

    goals = goals.filter((goal) => goal.id !== goalId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
