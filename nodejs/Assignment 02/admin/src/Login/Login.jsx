import { useState } from "react";
import FormContainer from "../ReusableComponent/FormContainer";
import FormInputs from "../ReusableComponent/FormInputs";
import { useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toastSuccess } from "../util/toast";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const account = useActionData();
  useEffect(() => {
    if (account?._id) {
      setAuth(account);
      toastSuccess(`Welcome ${account.username}`);
      navigate("/");
    }
  }, [account, setAuth, navigate]);

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  return (
    <FormContainer title="Login">
      <FormInputs fields={formInput} setFormInput={setFormInput} />
    </FormContainer>
  );
}
