import { counterActions } from "../stores/redux-store2";
import { useSelector, useDispatch } from "react-redux";

const CounterComponent2 = () => {
  const count = useSelector((state) => state.counter.count); // use slice or redux store
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const increase = () => {
    dispatch(counterActions.increase(10));
  };

  return (
    <div className="container">
      <h3>Counter 2</h3>
      <h4>{count}</h4>
      <button className="btn btn-primary mx-3" onClick={increase}>
        Increase by 10
      </button>
      <button className="btn btn-primary mx-3" onClick={increment}>
        Increment
      </button>
      <button className="btn btn-primary" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default CounterComponent2;
