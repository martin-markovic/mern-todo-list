import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GoalsForm from "../components/GoalsForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalsList from "../components/GoalsList";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, isEditing, errorMessage } = useSelector(
    (state) => state.goal
  );

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, isError, errorMessage, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(getGoals());
    }
  }, [user, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return isLoading ? (
    <div>
      <p>Please wait, loading...</p>
    </div>
  ) : (
    <section className="dashboard_goals">
      <>
        <h1>
          Welcome, {""}
          {user && user.name}
        </h1>
      </>
      <GoalsForm />
      {isEditing ? (
        <></>
      ) : (
        <>
          <div className="dasboard_filters">
            <button
              className="dashboard_filters-button"
              disabled={filter === "completed" ? "disabled" : ""}
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
            <button
              className="dashboard_filters-button"
              disabled={filter === "incomplete" ? "disabled" : ""}
              onClick={() => handleFilterChange("incomplete")}
            >
              Incomplete
            </button>
            <button
              className="dashboard_filters-button"
              disabled={filter === "all" ? "disabled" : ""}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
          </div>
          <GoalsList goals={goals} filter={filter} />
        </>
      )}
    </section>
  );
}

export default Dashboard;
