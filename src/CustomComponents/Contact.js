import React from 'react'

export default function Contact() {
    return (
        // Fragment tutorial
        // if you want to use multiple element of html in return method then you have to use root element div or React.Fragment or simply <></>

        // This will throw error
        // <h1>Contact page</h1>
        // <h2>How are you</h2>

        // its ok but it will create extra element which is not good
        // <div>
        // <h1>Contact page</h1>
        // <h2>How are you</h2>
        // </div>

        // <React.Fragment>
        // <h1>Contact page</h1>
        // <h2>How are you</h2>
        // </React.Fragment>

        // short of React.Fragment
        // <>
        // <h1>Contact page</h1>
        // <h2>How are you</h2>
        // </>

        /*
            React Context API allows us to easily access data at different levels of the component tree, without passing prop to every level

            There is three step: 1. createContext 2. provide context 3. consumer
        */



        // Form
        <>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </>
    )
}
