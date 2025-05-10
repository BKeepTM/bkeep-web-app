import React from "react";
import { Navigator, Redirect, Stack } from "expo-router";
import { useAuth } from "../hooks/authProvider";

const AuthGuard = ({ children }: any) => {
  const user = useAuth();
  if (!user.token) return <Redirect href="/(auth)/register" />;
  return (<>{children}</>);
};

export default AuthGuard;
