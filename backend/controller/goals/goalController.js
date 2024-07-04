import Goal from "../../models/goalModel.js";
import User from "../../models/userModel.js";

export const addGoal = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!req.body.text) {
      return res.status(404).json({ message: "Please add all fields" });
    }

    const newGoal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
      isCompleted: req.body.isCompleted,
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getGoals = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userId = req.user._id;
    const goals = await Goal.find({ user: userId });

    return res.status(200).json(goals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
    return res.status(500).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goalToUpdate = await Goal.findById(req.params.id);

    if (!goalToUpdate) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(500).json({ message: "Failed to update goal" });
    }

    return res.status(200).json(updatedGoal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goalToDelete = await Goal.findById(req.params.id);

    if (!goalToDelete) {
      return res.status(400).json({ message: "Goal not found" });
    }

    if (!req.user) {
      return res.json({ message: "User not found" });
    }

    if (goalToDelete.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Goal.deleteOne(goalToDelete);

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
