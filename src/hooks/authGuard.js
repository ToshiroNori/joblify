import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "@/features/auth/authSlice";

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ← needed

  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate, location]);

  return { loading, user, isAuthenticated, error };
};
