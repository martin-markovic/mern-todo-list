import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GoalsForm from "../components/GoalsForm";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section>
        <h1>Welcome, {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalsForm />
    </>
  );
}

export default Dashboard;
