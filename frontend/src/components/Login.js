
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin=async()=>{
        console.log(email,password)
        let result =await fetch("http://localhost:5000/login", {
            method:"post",
            body:JSON.stringify({email, password}),
            headers: {
                "Content-Type":"application/json",
            }
        })

        result = await result.json();
        //console.log(result)
        if(result.auth) {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }
        else {
            alert("please enter valid details")
        }

    }

    return (
        <div className="login">
            <h1>Login Page</h1>
            <input className="inputBox" type="text" placeholder="Enter Email"
            onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            
            <input className="inputBox" type="password" placeholder = "Enter Password"
            onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            
            <button className="signUpBtn" type="button"
            onClick={handleLogin}>Login</button>
        </div>
    )
};

export default Login;