import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGoal, updateGoal } from "../features/goals/goalSlice.js";
import { toast } from "react-toastify";

function GoalsForm() {
  const [formData, setFormData] = useState({
    text: "",
    isCompleted: false,
  });

  const dispatch = useDispatch();
  const { isEditing, formMessage } = useSelector((state) => state.goal);

  const { text, isCompleted } = formData;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        text: formMessage.text,
        isCompleted: formMessage.isCompleted,
      });
    } else {
      setFormData({
        text: "",
        isCompleted: false,
      });
    }
  }, [isEditing, formMessage]);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return toast.error("Please add text");
    } else {
      const goalData = { text, isCompleted };

      if (isEditing) {
        dispatch(updateGoal({ id: formMessage._id, goalData }));

        console.log(`dispatching ${goalData.text} and ${goalData.isCompleted}`);
      } else {
        dispatch(createGoal(goalData));
      }

      setFormData({ text: "", isCompleted: false });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Add text"
        value={text}
        onChange={onChange}
      ></input>
      {isEditing && (
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          checked={isCompleted}
          onChange={onChange}
        ></input>
      )}
      <input
        style={{ width: "30%", marginLeft: "30%" }}
        type="submit"
        value={isEditing ? "Update" : "Submit"}
      ></input>
    </form>
  );
}
export default GoalsForm;
