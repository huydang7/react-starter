import { useEffect, useState } from 'react';
import { getMe } from 'apis/auth';
import { makeRequest } from 'shared/utils';
import { useAuthStore } from 'stores/auth';
import { shallow } from 'zustand/shallow';

import LoadingScreen from 'components/LoadingScreen';

const InitState = (props: { children: JSX.Element }) => {
  const { tokens, setUser, hydrated } = useAuthStore(
    (state) => ({
      tokens: state.tokens,
      setUser: state.setUser,
      hydrated: state._hydrated,
    }),
    shallow
  );
  const [finished, setFinished] = useState(false);

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
