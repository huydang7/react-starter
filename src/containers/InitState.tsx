import { useQueryGetMe } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth";
import LoadingScreen from "../components/LoadingScreen";

const useHydration = () => {
  const [hydrated, setHydrated] = useState(useAuthStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useAuthStore.persist.onHydrate(() => {
      setHydrated(false);
    });
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

const InitState = () => {
  const { tokens } = useAuthStore();
  const getMe = useQueryGetMe();
  const hyrated = useHydration();

  useEffect(() => {
    if (tokens && hyrated) {
      getMe.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, hyrated]);

  if (!hyrated) {
    return <LoadingScreen />;
  }
  return <></>;
};

export default InitState;
