import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

//simple login form function made based on Register.jsx
function LoginForm() {
    //state object
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    //updates correct field upon typing
    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }
    //handles form submission
    async function handleSubmit(event) {
        //prevent page reloading upon submission
        event.preventDefault();
        const response = await fetch("api/player/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
        const user = await response.json();
        if (!response.ok) {
            console.error("Error logging in:", user);
            return;
        }
        console.log("Login succesful:", form);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Response from backend:", user);
        navigate("/")
    }

//html section
    return (
        <div className="login-container">
            <form className="input-section" onSubmit={handleSubmit}>
                <h1>Log in to begin playing!</h1>
                <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                required
                />
                <button type="submit" className="login-button">
                    Sign in
                </button>
                {/*this should have a link to the registration page*/}
                <p className="register-text">Don't have an account yet? <Link to="/register">Click here to register an account.</Link></p>
            </form>
        </div>
    )
}

export default LoginForm