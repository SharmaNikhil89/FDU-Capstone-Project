import React, { useState } from "react";
import "../Assests/SignUpLogin.css";
import user_icon from "../Assests/person.png";
import email_icon from "../Assests/email.png";
import password_icon from "../Assests/password.png";


const SignupLogin = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className = "container">
            <div className = "header">
                <div className = "text">{action}</div>
                <div className = "underline">__________</div>
            </div>
            <div className = "inputs">
                {action === "Login" ? <div></div>: <div className = "input">
                    <img src = {user_icon} alt = "" />
                    <input type = "text" placeholder = "Name" />
                </div>}
                
                <div className = "input">
                    <img src = {email_icon} alt = "" />
                    <input type = "email" placeholder = "Email ID" />
                </div>
                <div className = "input">
                    <img src = {password_icon} alt = "" />
                    <input type = "password" placeholder = "Password" />
                </div>
            </div>
            <div className = "submitContainer">
                <div className = {action === "Login" ? "submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className = {action === "Sign Up" ? "submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
            {action === "Sign Up" ? <div></div>: <div className = "forgotPassword">Forgot Password? <span>Click Here!</span></div>}
            
        </div>
    )
}

export default SignupLogin;