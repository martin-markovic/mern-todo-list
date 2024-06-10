import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running...go to http://localhost:${port}`);
});
