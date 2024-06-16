import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GoalsForm from "../components/GoalsForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, isError, message, navigate]);

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

  return isLoading ? (
    <div>
      <p>Please wait, loading...</p>
    </div>
  ) : (
    <>
      <section>
        <h1>Welcome, {user && user.name}</h1>
      </section>
      <GoalsForm />
      <section>
        {goals.length >= 0 ? (
          <div>
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goals yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
