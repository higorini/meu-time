import { useLocalStorage } from "react-use";

function Dashboard() {
  const [value, setValue] = useLocalStorage("key", "");

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
