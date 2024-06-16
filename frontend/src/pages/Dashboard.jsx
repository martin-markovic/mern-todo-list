import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GoalsForm from "../components/GoalsForm";
import { getGoals, reset } from "../features/goals/goalSlice";

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
    } else {
      if (!goals) {
        dispatch(getGoals());
      }

      return () => {
        dispatch(reset());
      };
    }
  }, [goals, user, navigate, isError, message, dispatch]);

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
    </>
  );
}

export default Dashboard;
