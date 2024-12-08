import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = (props) => {

    const host = "http://localhost:5000";
    const [info, setinfo] = useState({
        email: "", password: ""
    })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: info.email, password: info.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            navigate("/");
        }
    }

    const onChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }
    return (
        <div className='signin' 
     style={{
         border: props.mode === "light" ? "1px solid black" : "1px solid white", 
         padding: "30px 30px", 
         display: "flex", 
         justifyContent: "center", 
         alignItems: "center", 
         width: "100%", 
         height: "100vh",
         backgroundColor: props.mode === "light" ? "#f5f5f5" : "#333", // Optional: change background based on mode
         borderRadius: "8px", // Rounded corners for a box-like effect
         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Optional: shadow for the box effect
     }}>
    <form onSubmit={handleSubmit} style={{width: "100%", maxWidth: "400px"}}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={info.email}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" id="password" onChange={onChange} value={info.password}/>
        </div>
        <button  type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
</div>

    )
}

export default Signin
