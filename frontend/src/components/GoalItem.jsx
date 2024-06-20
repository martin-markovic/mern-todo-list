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
    <div className="goal-item">
      <div className="goal-item__row">
        <span
          className={`goal-item__text ${goal.isCompleted ? "-completed" : ""}`}
        >
          {goal.text}
        </span>
        {goal.isCompleted && (
          <span style={{ fontWeight: "bold" }}>Completed</span>
        )}
      </div>
      <div className="goal-item__row">
        <span>
          Submitted: {new Date(goal.createdAt).toLocaleString("en-US")}
        </span>
        <span>
          <button style={{ marginRight: "5px" }} onClick={onDelete}>
            Delete
          </button>
          <button onClick={onEdit}>Edit</button>
        </span>
      </div>
    </div>
  );
}

export default GoalItem;
