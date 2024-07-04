import mockDB from "../config/mockDB.js";

const mockProtect = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Not authorized, no token" });
  } else {
    let token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const userFound = mockDB.findOne("users", { token })[0];

      if (!userFound) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      req.user = userFound;

      next();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

export { mockProtect };
