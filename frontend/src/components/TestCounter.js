import React from "react";
import { useRecoilState } from "recoil";
import { testState } from "../recoil/atoms/TestState";

function TestCounter() {
  const [count, setCount] = useRecoilState(testState);

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
}

export default TestCounter;
