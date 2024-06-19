import GoalItem from "./GoalItem";

function GoalsList({ goals, filter }) {
  const filteredGoals = goals.filter((goal) => {
    if (filter === "completed") {
      return goal.isLoading === false;
    }

    if (filter === "incomplete") {
      return goal.isLoading === true;
    }

    return true;
  });
  return (
    <section>
      {filteredGoals.length > 0 ? (
        <div>
          {filteredGoals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3>No goals, please create a goal.</h3>
      )}
    </section>
  );
}

export default GoalsList;
