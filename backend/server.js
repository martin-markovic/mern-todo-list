import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import router from "./routes/router.js";

const port = process.env.PORT || 3001;

app.use("/api/goals", router);

app.listen(port, () => {
  console.log(`Server is running...go to http://localhost:${port}`);
});
