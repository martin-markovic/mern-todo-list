import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import router from "./routes/router.js";

const port = process.env.PORT || 3001;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running...go to http://localhost:${port}`);
});
