import React, { useRef, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const UseReducerDemoComponent = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  return (
    <div className="my-4">
      <p>Count: {state.count}</p>
      <button className="btn btn-danger" onClick={increment}>Increment</button>
    </div>
  );
}

export default function Contact() {
  const emailRef = useRef(); // use case of useRef hook
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    
    console.log(obj);
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
          Submit
        </button>
      </form>

      <UseReducerDemoComponent />
    </div>
  );
}
