import GoalItem from "./GoalItem";

function GoalsList({ goals, filter }) {
  const filteredGoals = goals.filter((goal) => {
    if (filter === "completed") {
      return goal.isCompleted === true;
    }

    if (filter === "incomplete") {
      return goal.isCompleted === false;
    }

    return true;
  });
  return (
    <section>
      {filteredGoals.length > 0 ? (
        <>
          {filteredGoals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </>
      ) : (
        <h3>No goals, please create a goal.</h3>
      )}
    </section>
  );
}

export default GoalsList;
