import { useState } from "react";
import { Form } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="form-container">
        <Form method="POST" className="form-control">
          <label>
            Username
            <input type="text" name="username" />
          </label>
          <label>
            Password <input type="text" name="password" />
          </label>
          {!isLogin && (
            <>
              <label>
                Confirm password
                <input type="text" name="confirm" />
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
