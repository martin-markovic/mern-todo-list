function GoalItem({ goal }) {
  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h1>{goal.title}</h1>
      <h2>{goal.text}</h2>
      <button onClick={onClick}>X</button>
    </div>
  );
}

export default GoalItem;
