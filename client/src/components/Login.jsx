import {useState} from "react";
import "./Login.css";

//simple login form function made based on Register.jsx
function LoginForm() {
    //state object
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    //updates correct field upon typing
    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }
    //handles form submission
    function handleSubmit(event) {
        //prevent page reloading upon submission
        event.preventDefault();
        //for now this just console logs a succesful log in attempt and shows the values submitted
        console.log("Login succesful:", form);
        //this is probably where the logic for sending the login request to the backend would go, once it's time for that
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
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                />
                <button type="submit" className="login-button">
                    Sign in
                </button>
                {/*this should have a link to the registration page*/}
                <p className="register-text">Don't have an account yet? Click here to register an account.</p>
            </form>
        </div>
    )
}

export default LoginForm