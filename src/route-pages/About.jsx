/*
    useEffect - By using useEffect Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
*/
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function About() {
  const [number, setNumber] = useState(0);
  const location = useLocation();

  // useEffect(() => {
  //     alert("I am clicked");
  // }); // run multiple times whenever component re-render

  useEffect(() => {
    console.log("I am clicked");
  }, [number]); // Only re-run the effect if number changes

  const updateNumber = () => {
    setNumber((prevState) => {
      return prevState + 1;
    });
  };

  console.log(location);

  return (
    <div className="container my-4">
      <h3>About page</h3>
      <button className="btn btn-primary" onClick={updateNumber}>
        Click Me {number}
      </button>
    </div>
  );
}
