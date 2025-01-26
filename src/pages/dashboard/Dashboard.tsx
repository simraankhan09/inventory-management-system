import React from "react";
import { useAuth } from "../../context/auth-context";
import { Button } from "antd";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  console.log({ user });
  return (
    <div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
