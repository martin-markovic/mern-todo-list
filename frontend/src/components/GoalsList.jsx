import GoalItem from "./GoalItem";
import { useState } from "react";

function GoalsList({ goals, filter }) {
  const [page, setPage] = useState(1);
  const goalsPerPage = 5;

  const filteredGoals = goals.filter((goal) => {
    if (filter === "completed") {
      return goal.isCompleted === true;
    }

    if (filter === "incomplete") {
      return goal.isCompleted === false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);
  const startIndex = (page - 1) * goalsPerPage;
  const currentGoals = filteredGoals.slice(
    startIndex,
    startIndex + goalsPerPage
  );

  const handlePage = (e) => {
    if (e.target.name === "previous" && page > 1) {
      setPage(page - 1);
    } else if (e.target.name === "next" && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <section>
      {currentGoals.length > 0 ? (
        <>
          {currentGoals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </>
      ) : (
        <h3>No goals, please create a goal.</h3>
      )}
      <div className="pagination">
        {page > 1 && (
          <button name="previous" onClick={handlePage}>
            Previous
          </button>
        )}
        <span>{page}</span>
        {page < totalPages && (
          <button name="next" onClick={handlePage}>
            Next
          </button>
        )}
      </div>
    </section>
  );
}

export default GoalsList;
