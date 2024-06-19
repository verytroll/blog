
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import "./register.css";

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    let handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);

        try {
            let res = await axios.post("/auth/register", {username, email, password});
            if(res.data) {
                window.location.replace("/login");
            }
        } catch(err) {
            setError(true);
        }
    }

    return(
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="registerFormName">Username</label>
                <input
                    id="registerFormName"
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(event) => {setUserName(event.target.value)}}
                />
                <label htmlFor="registerFormEmail">Email</label>
                <input
                    id="registerFormEmail"
                    className="registerInput"
                    type="email"
                    placeholder="Enter your email..."
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <label htmlFor="registerFormPassword">Password</label>
                <input
                    id="registerFormPassword"
                    type="password"
                    className="registerInput"
                    placeholder="Enter your password..."
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <button
                    type="submit"
                    className="registerButton"
                >Register</button>
            </form>
            <Link className="link" to="/login">
                <button type="button" className="loginButton">Login</button>
            </Link>
            {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
        </div>
    );
}
