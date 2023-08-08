import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.target.preventDefault();
    await createUser(formData);
  };

  return (
    <section>
      <div className="login_container">
        <h1>Register</h1>
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
            Create account
          </button>
        </form>
      </div>
    </section>
  );
}

async function createUser(userObj) {
  try {
    const res = await fetch("http://localhost:5000/register", {
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
