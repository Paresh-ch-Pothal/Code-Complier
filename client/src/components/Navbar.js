import React, { useState } from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    const navigate=useNavigate();
    let clicktogglemode = () => {
        if (props.mode == "light") {
            document.body.style.backgroundColor = "#151515";
            document.body.style.color = "white";
            props.setmode("dark")
        }
        else {
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            props.setmode("light")
        }
    }

    const handleLogout=()=>{
        try {
            localStorage.removeItem("token");
            navigate("/signup")
        } catch (error) {
            
        }
    }
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
                    </a>
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        {localStorage.getItem("token") ? 
                        <Link onClick={handleLogout} type="button" className="btn btn-info mx-2">Logout</Link> :
                        <div>
                        <Link type="button" className="btn btn-info mx-2" to='/signin'>Signin</Link>
                        <Link type="button" className="btn btn-info mx-2" to='signup'>Signup</Link></div> }
                        <MdOutlineLightMode onClick={clicktogglemode} color='white' size={25} className='mode' style={{ display: props.mode === "dark" ? "block" : "none" }} />
                        <IoMoon color='white' onClick={clicktogglemode} size={25} className='mode' style={{ display: props.mode === "light" ? "block" : "none" }} />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
