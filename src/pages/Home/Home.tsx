import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../rematch/store";

const Home = () => {
  const countState = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div>
      <span>Home</span>
      <span>{countState}</span>
      <Button
        onClick={() => {
          dispatch.count.increment(1);
        }}
      >
        Increase
      </Button>
    </div>
  );
};

export default Home;
