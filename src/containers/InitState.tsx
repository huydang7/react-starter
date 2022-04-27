/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../rematch/store";

const InitState = () => {
  const dispatch = useDispatch<Dispatch>();
  const tokens = useSelector((state: RootState) => state.auth.tokens);
  useEffect(() => {
    if (tokens) {
      dispatch.auth.getMe();
    }
  }, [tokens]);

  return <div></div>;
};

export default InitState;
