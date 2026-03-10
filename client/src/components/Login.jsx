import {useState} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import useFetchBetter from "./hooks/useFetchBetter.js";

//simple login form function made based on Register.jsx
function LoginForm({setIsAuthenticated}) {
    //state object
    const { fetchData, isLoading, error } = useFetchBetter(`api`);
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
        console.log("Login attempt:", form);
        const data = await fetchData("/player/login", "POST", null, JSON.stringify({
            email: form.email,
            password: form.password
        }));
            
        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            setIsAuthenticated(true)
            console.log("Response from backend:", data);
        }
    }

//html section
    return (
        <div className="login-container">
            <form className="input-section" onSubmit={handleSubmit}>
                <h1>Log in to begin playing!</h1>
                {error && <p className="error-message">{error}</p>}
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
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                </button>
                {/*this should have a link to the registration page*/}
                <p className="register-text">Don't have an account yet? <Link to="/register">Click here to register an account.</Link></p>
            </form>
        </div>
    )
}

export default LoginForm