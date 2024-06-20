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
      <span className={goal.isCompleted ? "goal-completed" : ""}>
        {goal.text}
      </span>
      {goal.isCompleted && <span>"Completed"</span>}
      <div>
        <span>{new Date(goal.createdAt).toLocaleString("en-US")}</span>
        <span>
          <button onClick={onDelete}>X</button>
          <button onClick={onEdit}>Edit</button>
        </span>
      </div>
    </div>
  );
}

export default GoalItem;
