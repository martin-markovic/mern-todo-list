import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGoal, updateGoal } from "../features/goals/goalSlice.js";
import { toast } from "react-toastify";

function GoalsForm() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const dispatch = useDispatch();
  const { isEditing, formMessage } = useSelector((state) => state.goal);

  const { title, text } = formData;

  useEffect(() => {
    if (isEditing && formMessage) {
      setFormData((prevState) => ({
        ...prevState,
        text: formMessage.text || "",
      }));
    } else {
      setFormData({ title: "", text: "" });
    }
  }, [isEditing, formMessage]);

  const onChange = (e) => {
    e.preventDefault();

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEditing ? !text : !title || !text) {
      return toast.error("Please fill all fields");
    } else {
      const goalData = {
        title,
        text,
      };

      if (isEditing) {
        dispatch(updateGoal({ id: formMessage._id, data: goalData }));
      } else {
        dispatch(createGoal(goalData));
      }

      setFormData({ title: "", text: "" });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {isEditing ? (
          <></>
        ) : (
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Add title"
            value={title}
            onChange={onChange}
          ></input>
        )}

        <input
          type="text"
          name="text"
          id="text"
          placeholder="Add text"
          value={text}
          onChange={onChange}
        ></input>
        <input type="submit" value={isEditing ? "Update" : "Submit"}></input>
      </form>
    </>
  );
}

export default GoalsForm;
