import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill out a name field"],
    },
    email: {
      type: String,
      required: [true, "Please fill out an email field"],
    },
    password: {
      type: String,
      required: [true, "Please fill out a password field"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
