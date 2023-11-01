import React, { useRef, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../stores/redux-store2";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const UseReducerDemoComponent = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  return (
    <div className="my-4">
      <p>Count: {state.count}</p>
      <button className="btn btn-danger" onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default function Contact() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const emailRef = useRef(); // use case of useRef hook
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(authenticationActions.onLogin());

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const logoutHandler = () => {
    dispatch(authenticationActions.onLogout());
  };

  return (
    <div className="container my-4 col-6">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="my-3 text-center">
        isAuthenticated: {`${isAuthenticated}`}{" "}
        <button className="btn btn-danger mx-3" onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <hr />
      <UseReducerDemoComponent />
    </div>
  );
}
