import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all fields" });
  }

  const userFound = await User.findOne({ email });

  if (userFound) {
    res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.json({ message: "Invalid user credentials" });
  }
};

export const loginUser = async (req, res) => {
  res.json({ message: "Login User" });
};

export const getUser = async (req, res) => {
  res.json({ message: "Get User Data" });
};
