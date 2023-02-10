import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useRedirectTo = (defaultTo = "/") => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useCallback(() => {
    const href = searchParams.get("redirect")
      ? decodeURIComponent(searchParams.get("redirect") ?? "")
      : defaultTo;
    navigate(href);
  }, [searchParams, defaultTo, navigate]);
};
