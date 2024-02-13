import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

function AdminRoutes({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticate, accessToken } = useAppSelector(
    (state) => state.auth
  );
  return (
    <>
      {user?.role === "ADMIN" && isAuthenticate && accessToken ? (
        children
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
}

export default AdminRoutes;
