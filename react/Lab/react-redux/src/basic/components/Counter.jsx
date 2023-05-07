import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/slice/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  // local state
  const counterValue = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.isShowCounter);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counterValue}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
