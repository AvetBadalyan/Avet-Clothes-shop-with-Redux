import "./SignUp.styles.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION_TYPES } from "../../store/user/user.action";

export default function SignUp() {
  const isLoggedIn = useSelector((store) => !!store?.userSlice?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // take the login and password from input field with useRef
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // check if we are in login mode or in sign up mode
  const [isLoginModeActive, setIsLoginModeActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLoginModeActive((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    // fetch with POST method from firebase depending if we are logging in or signing up
    let url;

    if (isLoginModeActive) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZKBZUd-DI0xI0ImxMY1Ye2TR0ta5tnTI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZKBZUd-DI0xI0ImxMY1Ye2TR0ta5tnTI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch({
          type: USER_ACTION_TYPES.SET_CURRENT_USER,
          payload: data.email,
        });
        dispatch({ type: USER_ACTION_TYPES.SET_TOKEN, payload: data.idToken });
        alert("successfully logged in");
        navigate(-1);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // same div, content depending on the state we are logging in or signing up
  return (
    <section className="auth">
      <h1>{isLoginModeActive ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="login-control">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="login-control">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="login-actions">
          {!isLoading && (
            <button>{isLoginModeActive ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request... </p>}
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLoginModeActive
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
