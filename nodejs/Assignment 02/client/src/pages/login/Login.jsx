import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.status !== 200) {
      toast.error("❌ Cannot find account!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(`🦄 Welcome back ${formData.username} !`, {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        setUser(() => res.user);
        navigate("/");
      }, 700);
    }
  };

  return (
    <>
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
    </>
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

    if (res.status === 404) {
      throw new Error("Cannot find your account");
    }

    return { status: 200, user: await res.json() };
  } catch (error) {
    console.log("error:", error);
    return { status: 404 };
  }
}
