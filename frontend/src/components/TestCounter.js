import React from "react";
import { useRecoilState } from "recoil";
import { TestState } from "../recoil/atoms/TestState";

const TestCounter = () => {
  const [count, setCount] = useRecoilState(TestState);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Test Count : {count}</p>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
  );
};

export default TestCounter;
