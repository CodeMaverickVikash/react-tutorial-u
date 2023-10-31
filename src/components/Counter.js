import { useSelector, useDispatch } from "react-redux";

const CounterComponent = () => {
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

  return (
    <div className="container">
      <h4>{count}</h4>
      <button className="btn btn-primary mx-3" onClick={increment}>
        Increment
      </button>
      <button className="btn btn-primary" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default CounterComponent;
