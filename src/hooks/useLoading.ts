import { useSelector } from "react-redux";
import usePrevious from "./usePrevious";

interface CustomLoading {
  finished?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}
const useLoading = <RootState, DetailedPayload>(
  selector: (state: RootState) => DetailedPayload,
  equalityFn?:
    | ((left: DetailedPayload, right: DetailedPayload) => boolean)
    | undefined
): CustomLoading => {
  const { loading, success, error } = useSelector<any, any>(
    selector,
    equalityFn
  );
  const prevLoading = usePrevious(loading);
  return {
    loading,
    success,
    error,
    finished: prevLoading === true && loading === false,
  };
};
export default useLoading;
