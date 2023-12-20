import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useLogin } from "../Auth/LoginContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, setUser } = useLogin();
  const loginResult = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResult) {
      setUser(loginResult);
      navigate("/");
    }
  }, [loginResult, navigate, user, setUser]);

  return (
    <>
      <div className="form-container">
        <Form method="POST" className="form-control">
          <label>
            Username
            <input type="text" name="userName" />
          </label>
          <label>
            Password <input type="text" name="password" />
          </label>
          {!isLogin && (
            <>
              <label>
                Confirm password
                <input type="text" name="confirmPassword" />
              </label>
              <label>
                Email
                <input type="text" name="email" />
              </label>
            </>
          )}
          <button
            name="intent"
            value={isLogin ? "login" : "signup"}
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </Form>
        <p
          className="link-form"
          onClick={() => setIsLogin((prevState) => !prevState)}
        >
          {isLogin
            ? "Haven't have account yet? Sign up"
            : "Already have account? Login"}
        </p>
      </div>
    </>
  );
}
