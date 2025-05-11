import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/features/auth/authSlice";

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user && !isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, user, isAuthenticated]);

  return { loading, user, isAuthenticated, error };
};
