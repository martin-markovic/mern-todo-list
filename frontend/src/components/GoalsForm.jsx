import { useState } from "react";
import { useDispatch } from "react-redux";

import { createGoal } from "../features/goals/goalService";
import { toast } from "react-toastify";

function GoalsForm() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const dispatch = useDispatch();

  const { title, text } = formData;

  const onChange = (e) => {
    e.preventDefault();

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !text) {
      toast.error("Please fill all fields");
    }

    const formData = {
      title,
      text,
    };

    setFormData({ title: "", text: "", isComplete: false });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Add title"
          value={title}
          onChange={onChange}
        ></input>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Add text"
          value={text}
          onChange={onChange}
        ></input>
        <input type="submit" value={"Submit"}></input>
      </form>
    </>
  );
}

export default GoalsForm;
