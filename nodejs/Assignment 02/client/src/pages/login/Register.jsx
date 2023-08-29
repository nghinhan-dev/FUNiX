import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createUser(formData);
    if (res.status !== 200) {
      toast.error("❌ Username already exist!", {
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
      toast.success(`🦄 Nice to meet you, ${formData.username} !`, {
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
        navigate("/");
      }, 700);
    }
  };

  return (
    <>
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

async function createUser(userObj) {
  try {
    const res = await fetch("http://localhost:5000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (res.status === 404) {
      throw new Error("Cannot find your account");
    }

    return 200;
  } catch (error) {
    console.log("error:", error);
    return 404;
  }
}
