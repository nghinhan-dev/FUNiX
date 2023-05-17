import { useRef, useState } from "react";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const displayNameReft = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1
        style={{
          fontSize: "40px",
          margin: "15px 0",
          textTransform: "uppercase",
        }}
      >
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              ref={displayNameReft}
              required
            />
          </div>
        )}
        <p style={{ color: "red" }} className="error">
          {error}
        </p>
        <div className={classes.actions}>
          {isLogin ? (
            <button onClick={loginHandle}>Login</button>
          ) : (
            <button onClick={signUpHandle}>Sign Up</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );

  function loginHandle(e) {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        // Signed in
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  async function signUpHandle(e) {
    e.preventDefault();
    // create
    try {
      const responese = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (!responese) {
        throw new Error("Cannot create new user");
      }

      await updateProfile(responese.user, {
        displayName: displayNameReft.current.value,
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }
}
