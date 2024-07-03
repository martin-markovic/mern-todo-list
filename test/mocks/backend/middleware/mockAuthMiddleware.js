import mockDB from "../config/mockDB.js";

const mockProtect = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const userFound = mockDB.findOne("users", { token })[0];
      req.user = userFound;

      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { mockProtect };
