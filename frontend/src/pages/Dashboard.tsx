import { lazy } from "react";
const ButtonSignout = lazy(() => import('../components/buttons/ButtonSignout'));

const Dashboard = () => {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <ButtonSignout />
    </div>
  );
};

export default Dashboard;