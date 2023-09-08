import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { toastError, toastSuccess } from "../util/toast";
import { ToastContainer } from "react-toastify";
import FormContainer from "../ReusableComponent/FormContainer";
import FormDisplay from "../ReusableComponent/FormDisplay";
import FormInputs from "../ReusableComponent/FormInputs";

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
    isAdmin: "",
  });

  return (
    <>
      <FormContainer title={"User"}>
        <FormDisplay fields={formInput} />
        <FormInputs fields={formInput} setFormInput={setFormInput} />
      </FormContainer>
      <ToastContainer />
    </>
  );
}
