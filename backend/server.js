import dotenv from "dotenv";
dotenv.config();

import connectDB from "../backend/config/db.js";
connectDB();

import express from "express";
const app = express();

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import router from "./routes/router.js";

const port = process.env.PORT || 3001;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running...go to http://localhost:${port}`);
});

export default app;
