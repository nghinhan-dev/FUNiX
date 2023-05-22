import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../Context/context";
import { v4 as uuidv4 } from "uuid";

export default function LoginPage() {
  // eslint-disable-next-line no-unused-vars
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [err, setErr] = useState({
    errFullName: "",
    errEmail: "",
    errPassword: "",
    errPhone: "",
  });
  const initialUserArr = JSON.parse(localStorage.getItem("userArr")) || [];
  const navigate = useNavigate();

  // Initialize the state with the initial value
  const [userArr, setUserArr] = useState(initialUserArr);

  // Update localStorage whenever userArr changes
  useEffect(() => {
    localStorage.setItem("userArr", JSON.stringify(userArr));
  }, [userArr]);

  // form's refs
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);

  // signUp handle
  const createAccount = () => {
    const formData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
    };
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const validationRules = [
      {
        field: "fullName",
        errorMessage: "Cannot be empty",
        validationFn: (value) => value.trim().length > 0,
      },
      {
        field: "email",
        errorMessage: "Cannot be empty",
        validationFn: (value) => value.trim().length > 0,
      },
      {
        field: "email",
        errorMessage: "Invalid email format, ex : example@domain.com",
        validationFn: (value) => emailRegex.test(value),
      },
      {
        field: "email",
        errorMessage: "Invalid email, your email was already sign up",
        validationFn: (value) =>
          userArr.findIndex((user) => user.email === value) === -1,
      },
      {
        field: "password",
        errorMessage: "Cannot be empty",
        validationFn: (value) => value.trim().length > 0,
      },
      {
        field: "password",
        errorMessage: "Minimum 9 characters length",
        validationFn: (value) => value.length >= 9,
      },
      {
        field: "phone",
        errorMessage: "Cannot be empty",
        validationFn: (value) => value.trim().length > 0,
      },
    ];

    let isValid = true;
    const errors = {};

    validationRules.forEach(({ field, errorMessage, validationFn }) => {
      const value = formData[field];
      const isFieldValid = validationFn ? validationFn(value) : value;

      if (!isFieldValid) {
        isValid = false;
        errors[field] = errorMessage;
      }
    });

    if (isValid) {
      const newUser = { id: uuidv4(), ...formData };
      setUserArr((prevState) => [...prevState, newUser]);

      // Convert the userArr to a JSON string
      const userArrJson = JSON.stringify(userArr);

      // Save the userArr to localStorage
      localStorage.setItem("userArr", userArrJson);
      setIsLogin(true);
    }

    setErr(errors);
  };

  const logIn = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let isAuth = true;
    const index = userArr.findIndex((user) => user.email === email);

    if (!userArr[index] || !userArr[index].password === password) {
      isAuth = false;
      setErr((prevState) => ({
        ...prevState,
        loginState: "Invalid email / password",
      }));
    }

    if (isAuth) {
      setCurrentUser(userArr[index]);
      navigate("/");
    }
  };

  return (
    <div
      id="homepage_banner"
      className="d-flex flex-column align-items-start justify-content-center"
    >
      <div id="authForm">
        <h3>{isLogin ? "Sign In" : "Sign Up"}</h3>
        <form className="h-auto d-flex flex-column">
          <div className="formContainer">
            {!isLogin && (
              <>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  ref={fullNameRef}
                />
                {err.fullName !== "" && (
                  <p className="text-danger bg-warning">{err.fullName}</p>
                )}
              </>
            )}
            {err.loginState !== "" && (
              <p className="text-danger bg-warning">{err.loginState}</p>
            )}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            {err.email !== "" && (
              <p className="text-danger bg-warning">{err.email}</p>
            )}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              minLength={8}
              ref={passwordRef}
            />
            {err.password !== "" && (
              <p className="text-danger bg-warning">{err.password}</p>
            )}
            {!isLogin && (
              <>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  ref={phoneRef}
                />
                {err.phone !== "" && (
                  <p className="text-danger bg-warning">{err.phone}</p>
                )}
              </>
            )}
          </div>
        </form>
        {isLogin ? (
          <input
            className="bg-dark mb-2 text-white"
            type="submit"
            value={"Sign In"}
            onClick={logIn}
          />
        ) : (
          <input
            className="bg-dark mb-2 text-white"
            type="submit"
            value={"Sign Up"}
            onClick={createAccount}
          />
        )}

        {isLogin ? (
          <p>
            Create an account?{" "}
            <span onClick={() => setIsLogin(false)}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have account?{" "}
            <span onClick={() => setIsLogin(true)}>Sign in</span>
          </p>
        )}
      </div>
    </div>
  );
}
