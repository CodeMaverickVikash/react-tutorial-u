import React, { useState } from "react";

const Forms = () => {
    let [form, setForm] = useState({
        fname: '',
        lname: '',
        email: ''
    });

    const onChangeField = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const submitForm = () => {
        console.log(form);
    }

    return (
        <div className="mt-4 col-6">
            <div className="mb-3">
                <input type="text" name="fname" className="form-control" placeholder="First Name" onChange={onChangeField} />
            </div>
            <div className="mb-3">
                <input type="text" name="lname" className="form-control" placeholder="Last Name" onChange={onChangeField} />
            </div>
            <div className="mb-3">
                <input type="email" name="email" className="form-control" placeholder="Email" aria-describedby="emailHelp" onChange={onChangeField} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
        </div>
    )
}

export default Forms;