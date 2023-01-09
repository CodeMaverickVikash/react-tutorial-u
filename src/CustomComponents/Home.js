import React, {useState} from 'react'

export default function Home() {
    // useState /state /hooks tutorial
    // current data, updated data = initial data
    const [count, setCount] = useState(0);

    const incNumber = ()=>{
        // console.log("clicked me")
        setCount(count + 1);
    }

    return (
        <div className="container my-5 text-center">
            <h1>{count}</h1>
            <button type="button" class="btn btn-primary" onClick={incNumber}>Click Me</button>
        </div>
    )
}
