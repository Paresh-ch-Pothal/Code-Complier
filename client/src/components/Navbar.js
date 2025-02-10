import React, { useState } from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import image from "../assets/image.png"

const Navbar = (props) => {

    const navigate=useNavigate();

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
                        <img src={image} alt="" width="70" height="43" />
                    </a>
                    <a className="navbar-brand" href="/">Code Runner</a>
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
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
