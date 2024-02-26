import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState(
        {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    );
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidate()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            console.log(data);
            if (data.success === false) {
                toast.error(data.message, toastOptions);
            }
            if (data.success === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
                toast.success(data.message, toastOptions);
                /*Storing data in localStorage is like having a little storage space on the user's device (like their computer or phone) where you can keep some information. 
                In this case, after a user successfully registers on your website, you're putting some details about them in this storage space.Advantages:
                Remembering Users: It helps your website remember who the user is, even if they close the browser and come back later. 
                This way, they don't have to log in again each time.
                Faster Access: Some information can be quickly retrieved from this local storage on the user's device without needing to ask the server every time. */


                /*Setting a cookie and using local storage are similar in that both are client-side storage mechanisms, but they have some key differences:
                Scope:
                Cookies: Cookies are automatically sent with every HTTP request to the domain, including images, scripts, and styles. They are sent to both the server and the client, and they have an expiration date.
                Local Storage: Data in local storage stays on the client's side only and is not automatically sent with each HTTP request. It has no expiration date and persists even when the user closes the browser.
                Size Limit:
                Cookies: Limited to around 4 KB of data per domain.
                Local Storage: Typically allows for more storage space (5-10 MB per domain).
                Security:
                Cookies: Cookies can be set with various attributes, including Secure and HttpOnly, to enhance security. Secure ensures the cookie is sent over HTTPS only, and HttpOnly prevents client-side scripts from accessing the cookie.
                Local Storage: Is accessible by client-side scripts, so it may not be as secure for sensitive data. It's not automatically sent with HTTP requests, reducing the risk of interception.
                Usage:
                Cookies: Often used for session management, user authentication, and tracking user behavior.
                Local Storage: Typically used for persisting non-sensitive data on the client side, like user preferences or settings.
                Expiration:
                Cookies: Can have an expiration date, which means they will be automatically deleted after a certain period.
                Local Storage: Does not have an expiration date; data persists until manually cleared or the user clears browser data.
                In summary, cookies are more commonly used for managing user sessions and authentication, while local storage is often used for storing non-sensitive, persistent data on the client side. The choice between them depends on your specific use case and requirements.*/
            }
        }

    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const handleValidate = () => {
        const { password, confirmPassword, username, email } = values;

        // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (password !== confirmPassword) {
            toast.error('Password and confirm password should be the same', toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error('Password should contain more than 8 characters', toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error('Username should contain more than 3 characters', toastOptions);
            return false;
        } else if (!emailRegex.test(email)) {
            toast.error('Invalid email address', toastOptions);
            return false;
        }
        return true;
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="LOGO"></img>
                        <h1>snappy</h1>
                    </div>
                    {/* username */}
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => handleChange(e)}>
                    </input>
                    {/* email */}
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handleChange(e)}>
                    </input>
                    {/* password */}
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}>
                    </input>
                    {/* confirm password */}
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="ConfirmPassword"
                        onChange={(e) => handleChange(e)}>
                    </input>
                    <button id="register" type="submit">Create User</button>
                    <span>
                        Already have an account?
                        <Link to="/Login">Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem; 
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
         padding:1rem 2rem;
         border:none;
         font-weight:bold;
         cursor:pointer;
         border-radius:0.4rem;
         font-size:1rem;
         text-transform:uppercase;
         transition:0.5s ease-in-out;
         &:hover{
            background-color:#4e0eff;
         }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-trasform:none;
            font-weight:bold; 
        }
    }
}
`;
export default Register 
