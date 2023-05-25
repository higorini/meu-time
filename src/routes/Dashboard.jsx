import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [value, setValue] = useLocalStorage("key", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (value.length == 0) {
      return navigate("/");
    }
  }, [value]);

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Value: {value}</p>
      </div>
    </div>
  );
}

export default Dashboard;
