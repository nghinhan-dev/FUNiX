import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <section>
      <div className="login_container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login_form">
          <input
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit" className="btn" style={{ width: "213px" }}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

async function login(userObj) {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (!res.ok) {
      throw new Error("Some thing wrong!");
    }
  } catch (error) {
    console.log("error:", error);
  }
}
