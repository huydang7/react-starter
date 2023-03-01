import { useEffect, useState } from "react";
import { useAuthStore } from "stores/auth";
import LoadingScreen from "components/LoadingScreen";
import { makeRequest } from "shared/query";
import { getMe } from "apis/auth";

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

const InitState = (props: { children: JSX.Element }) => {
  const { tokens, setUser } = useAuthStore();
  const [finished, setFinished] = useState(false);
  const hydrated = useHydration();

  const init = async () => {
    const user = await makeRequest(getMe());
    setUser(user);
    setFinished(true);
  };

  useEffect(() => {
    if (hydrated) {
      if (tokens) {
        init();
      } else {
        setFinished(true);
      }
    }
  }, [tokens, hydrated]);

  if (!hydrated || !finished) {
    return <LoadingScreen />;
  }
  return <>{props.children}</>;
};

export default InitState;
