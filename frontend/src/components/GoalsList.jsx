import GoalItem from "./GoalItem";
import { useState, useEffect } from "react";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function GoalsList({ goals, filter }) {
  const [page, setPage] = useState(1);
  const goalsPerPage = 5;

  useEffect(() => {
    setPage(1);
  }, [filter]);

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
    if (e.currentTarget.name === "previous" && page > 1) {
      setPage(page - 1);
    } else if (e.currentTarget.name === "next" && page < totalPages) {
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
        <h3 style={{ textAlign: "center" }}>No goals, please create a goal.</h3>
      )}
      <div className="goal-list__pagination">
        {page > 1 && (
          <button
            className="goal-list__pagination-button"
            name="previous"
            onClick={handlePage}
          >
            <FaArrowAltCircleLeft />
          </button>
        )}
        <span style={{ fontSize: "large", margin: "0 1em" }}>{page}</span>
        {page < totalPages && (
          <button
            className="goal-list__pagination-button"
            name="next"
            onClick={handlePage}
          >
            <FaArrowAltCircleRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default GoalsList;
