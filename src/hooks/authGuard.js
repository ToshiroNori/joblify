import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "@/features/auth/authSlice";

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return { loading, user, isAuthenticated, error };
};
