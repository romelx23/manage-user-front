import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { useEffect, useState } from "react";
// import { isAuthenticated } from '../helpers/router/index';

export const Protected = () => {
  // const token = localStorage.getItem("token");
  const { isAuthenticated, revalidate } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      await revalidate();
      setLoading(false);
    };

    validateUser();
  }, [revalidate]);

  if (loading) {
    return <div>Loading...</div>; // O un spinner de carga
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;

  // useEffect(() => {
  //   revalidate();
  // }, [revalidate]);

  // return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export const Redirect = () => {
  // const token = localStorage.getItem("token");
  const { isAuthenticated, revalidate } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      revalidate();
      setLoading(false);
    };

    validateUser();
  }, [revalidate]);

  if (loading) {
    return <div>Loading...</div>; // O un spinner de carga
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;

  // useEffect(() => {
  //   revalidate();
  // }, [revalidate]);
  // console.log({ user });
  // return user ? <Navigate to="/dashboard" /> : <Outlet />;
};