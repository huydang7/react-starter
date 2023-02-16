import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useRedirect = (to = "/") => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return useCallback(() => {
    const href = searchParams.get("redirect");
    navigate(decodeURIComponent(href || to));
  }, [searchParams, to, navigate]);
};
