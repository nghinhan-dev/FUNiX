import { useActionData } from "react-router-dom";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";

import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../util/toast";

export default function AddRoomType() {
  const notify = useActionData();
  console.log("notify:", notify);

  useEffect(() => {
    notify?.error && toastError(notify.error.errors[0]);

    notify?.success &&
      toastSuccess(`Add ${notify.success.username} to database!`);
  }, [notify]);

  const [formFields, setFormFields] = useState({
    desc: "",
    maxPeople: "",
    price: "",
    roomNums: [],
    title: "",
  });

  return (
    <>
      <FormContainer title={"Add RoomType"}>
        <FormDisplay fields={formFields} />
        <FormInputs fields={formFields} setFormInput={setFormFields} />
      </FormContainer>
    </>
  );
}
