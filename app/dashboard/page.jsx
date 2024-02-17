"use client";

import React from "react";
import useAuthStore from "@/stores/useAuthStore";

const DashboardPage = () => {
  const isOrgAdmin = useAuthStore((state) => state.isOrgAdmin);

  return (
    <div>
      {isOrgAdmin ? (
        <h1>Dashboard for organization</h1>
      ) : (
        <h1>Dashboard for normal user</h1>
      )}
    </div>
  );
};

export default DashboardPage;
