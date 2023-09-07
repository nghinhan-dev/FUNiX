import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { toastError, toastSuccess } from "../util/toast";
import { ToastContainer } from "react-toastify";

export default function AddUser() {
  const notify = useActionData();

  useEffect(() => {
    notify?.confirmError && toastError(notify.unmatch);

    notify?.error && toastError(notify.error);

    notify?.success &&
      toastSuccess(`Add ${notify.success.username} to database!`);
  }, [notify]);

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirm: "",
    fullname: "",
    phone: "",
    email: "",
  });

  const labelHasTextStyle = {
    opacity: "1",
    top: "0px",
  };

  const labelEmptyStyle = {
    top: "28px",
    opacity: "0.7",
  };

  return (
    <>
      <section id="render_data">
        <Form method="POST">
          <div className="header">
            <h3>Add User</h3>
            <button className="btn btn-add" type="submit">
              Submit
            </button>
          </div>
          <div className="add-form-container">
            <div className="table_container add-display main-shadow">
              <code>
                <p className="bracket">{`{`}</p>
                <p>
                  username: <span>{formInput.username}</span>,
                </p>
                <p>
                  password: <span>{formInput.password}</span>,
                </p>
                <p>
                  fullName: <span>{formInput.fullname}</span>,
                </p>
                <p>
                  phoneNumber: <span>{formInput.phone}</span>,
                </p>
                <p>
                  email: <span>{formInput.email}</span>,
                </p>
                <p>
                  isAdmin:
                  <span>{formInput.isAdmin ? "true" : "false"}</span>,
                </p>
                <p className="bracket">{`}`}</p>
              </code>
            </div>
            <div className="form-inputs">
              <div>
                <label
                  style={
                    formInput.username.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  style={
                    formInput.password.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  style={
                    formInput.confirm.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Confirm password
                </label>
                <input
                  type="text"
                  name="confirm"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      confirm: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  style={
                    formInput.fullname.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      fullname: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  style={
                    formInput.phone.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  style={
                    formInput.email.length !== 0
                      ? labelHasTextStyle
                      : labelEmptyStyle
                  }
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                isAdmin
                <input
                  type="checkbox"
                  name="isAdmin"
                  onChange={(e) =>
                    setFormInput((prevState) => ({
                      ...prevState,
                      isAdmin: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </Form>
      </section>
      <ToastContainer />
    </>
  );
}
