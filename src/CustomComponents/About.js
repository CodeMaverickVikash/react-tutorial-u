// useEffect Tutorial
/*
    By using useEffect Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
*/
import React, {useState, useEffect} from 'react';

export default function About() {
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     alert("I am clicked");
    // });

    useEffect(() => {
        alert("I am clicked");
    }, [count]); // Only re-run the effect if count changes

    const Inc = ()=>{
        setCount(count+1);
    }
    return (
        <div>
            <button onClick={Inc}>click Me {count}</button>
        </div>
    )
}
