import {useState} from "react";
import { Link } from "react-router-dom";
import "./Register.css";

//simple registration form function taking inspiration from the first coding marathon's BookCollectionManager.jsx
function RegisterForm() {
    //state object
    const [form, setForm] = useState({
        displayname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    //updates correct field upon typing
    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }
    //handles form submission
    function handleSubmit(event) {
        //prevent page reloading upon submission
        event.preventDefault();
        //very simple check if passwords match
        //should also maybe make some kind of notification if email is not a properly formatted email. input type="email" sort of takes care of this but doesn't actually give any kind of indication besides not allowing the submission of the form.
        if (form.password !== form.confirmPassword) {
        //this alert should probably be changed to something better looking later on
        alert("Passwords do not match");
        return;
        }
        //for now this just console logs a succesful registration and shows the values submitted
        console.log("Submission succesful:", form);
        //this is probably where the logic for sending registration data to the backend would go, once it's time for that
    }

//html section
    return (
        <div className="register-container">
            <form className="input-section" onSubmit={handleSubmit}>
                <h1>Register to begin playing!</h1>
                <input
                type="text"
                name="displayname"
                placeholder="Display Name"
                value={form.displayname}
                onChange={handleChange}
                className="input-field"
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                required
                />
                <p className="password-text">Make your password secure!
                Recommended: 8 characters with upper and lowercase letters, including a unique character.</p>
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                required
                />
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field"
                required
                />
                <button type="submit" className="register-button">
                    Register now
                </button>
                {/*this should have a link to the login page eventually when I actually make the login page.*/}
                <p className="login-text">Already have an account? <Link to="/login">Click here to sign in.</Link></p>
            </form>
        </div>
    )
}

export default RegisterForm