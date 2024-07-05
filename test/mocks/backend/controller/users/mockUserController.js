import mockDB from "../../config/mockDB.js";

const mockRegisterUser = (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.password2
  ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  const existingUser = mockDB.findOne("users", { email: req.body.email })[0];

  if (!existingUser) {
    return res.status(201).json({
      name: req.body.name,
      email: req.body.email,
    });
  } else {
    return res.status(400).json({ message: "User already exists" });
  }
};

const mockLoginUser = (req, res) => {
  const userToAuth = mockDB.findOne("users", { email: req.body.email })[0];

  if (
    req.body.email !== userToAuth.email ||
    req.body.password !== userToAuth.password
  ) {
    return res.status(401).json({ message: "Invalid user credentials" });
  } else {
    return res.status(200).json({
      id: userToAuth.id,
      name: userToAuth.name,
      email: userToAuth.email,
      token: userToAuth.token,
    });
  }
};

export { mockRegisterUser, mockLoginUser };
