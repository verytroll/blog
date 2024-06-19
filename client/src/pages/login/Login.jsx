
import {useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import {LoginStart, LoginSuccess, LoginFailure} from "../../context/Actions";
import axios from "axios";
import "./login.css";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);

    let handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(LoginStart());
        try {
            let res = await axios.post("/auth/login", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch(LoginSuccess(res.data));
        } catch(err) {
            dispatch(LoginFailure());
        }
    }

    return(
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="loginFormName">Username</label>
                <input
                    id="loginFormName"
                    className="loginInput"
                    type="text"
                    placeholder="Enter your username..."
                    ref={usernameRef}
                />
                <label htmlFor="loginFormPassword">Password</label>
                <input
                    id="loginFormPassword"
                    type="password"
                    className="loginInput"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button
                    type="submit"
                    className="loginButton"
                    disabled={isFetching}
                >Login</button>
            </form>
            <Link className="link" to="/register">
                <button type="button" className="registerButton">Register</button>
            </Link>
        </div>
    );
}
