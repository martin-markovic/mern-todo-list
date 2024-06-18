import Goal from "../../models/goalModel.js";
import User from "../../models/userModel.js";

// POST create a new goal
export const addGoal = async (req, res) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res.status(404).json({ message: "Please add all fields" });
    }

    const newGoal = await Goal.create({
      title: req.body.title,
      text: req.body.text,
      user: req.user.id,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all goals
export const getGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const goals = await Goal.find(userId);

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
      return res.status(404).json({ message: "Goal not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (goal.user.toString() !== user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    return res.status(200).json(goal);
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

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(500).json({ message: "Failed to update goal" });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE goal by id
export const deleteGoal = async (req, res) => {
  try {
    const goalToDelete = await Goal.findById(req.params.id);

    if (!goalToDelete) {
      res.status(400).json({ message: "Goal not found" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (goal.user.toString() !== user.id) {
      res.status(401).json({ message: "User not authorized" });
    }

    await Goal.deleteOne(goalToDelete);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
