import Goal from "../../models/goalModel.js";

// POST create a new goal
export const addGoal = async (req, res) => {
  const { title } = req.body;

  try {
    if (!title) {
      return res.status(404).json({ message: "Please add a title" });
    }

    const newGoal = await Goal.create({
      text: req.body.text,
    });

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
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update a goal by id
export const updateGoal = async (req, res) => {
  try {
    const goalToUpdate = await Goal.findById(req.params.id);

    if (!goalToUpdate) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE goal by id
export const deleteGoal = async (req, res) => {
  try {
    const goalToDelete = await Goal.findById(req.params.id);

    console.log(goalToDelete);

    if (!goalToDelete) {
      res.status(400).json({ message: "Goal not found" });
    }

    await Goal.deleteOne(goalToDelete);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
