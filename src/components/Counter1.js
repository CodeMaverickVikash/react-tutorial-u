import { useSelector, useDispatch } from "react-redux";

const CounterComponent1 = () => {
  const count = useSelector((state) => state.count); // use redux store
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({
      type: "INCREMENT",
    });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const increase = () => {
    dispatch({ type: "INCREASE", amount: 10 });
  };

  return (
    <div className="container">
      <h3>Counter 1</h3>
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

export default CounterComponent1;
