/*
    useEffect - By using useEffect Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
*/
import React, { useState, useEffect } from "react";

export default function About() {
  const [number, setNumber] = useState(0);

  // useEffect(() => {
  //     alert("I am clicked");
  // });

  useEffect(() => {
    console.log("I am clicked");
  }, [number]); // Only re-run the effect if number changes

  const updateNumber = () => {
    setNumber((prevState) => {
      return prevState + 1;
    });
  };
  return (
    <div className="container my-4">
      <h3>About page</h3>
      <button className="btn btn-primary" onClick={updateNumber}>
        Click Me {number}
      </button>
    </div>
  );
}
