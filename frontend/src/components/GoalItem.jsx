import { useDispatch } from "react-redux";

import { deleteGoal, editGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
  };
  const onEdit = () => {
    dispatch(editGoal(goal._id));
  };
  return (
    <div>
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h1>{goal.title}</h1>
      <h2>{goal.text}</h2>
      <button onClick={onDelete}>X</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default GoalItem;
