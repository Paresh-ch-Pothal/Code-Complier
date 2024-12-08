import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [info, setinfo] = useState({
        name: "", email: "", password: ""
    })
    let navigate = useNavigate();
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = info;
        const response = await fetch(`${host}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: info.name, email: info.email, password: info.password })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            navigate("/");
        }
    }

    const OnChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }
    return (
        <div className='signup' style={{
            border: props.mode == "light" ? "1px solid black" : "1px solid white", 
            padding: "30px 30px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            width: "100%", 
            height: "100vh",
            backgroundColor: props.mode == "light" ? "#f5f5f5" : "#333", 
            borderRadius: "8px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
        }}>
            <form onSubmit={handleSubmitSignup}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" id="name" aria-describedby="emailHelp" onChange={OnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={OnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" onChange={OnChange}/>
                </div>
                <button  type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
