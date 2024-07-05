import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  const userFound = await User.findOne({ email });

  if (userFound) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.json({ message: "Invalid user credentials" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    return res.status(200).json({
      _id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      token: generateToken(userFound._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid user credentials" });
  }
};

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );
};
