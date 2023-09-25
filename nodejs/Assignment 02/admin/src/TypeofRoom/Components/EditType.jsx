import { useEffect, useState } from "react";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";
import { useActionData, useLoaderData } from "react-router-dom";
import { toastSuccess } from "../../util/toast";

export default function EditType() {
  const notify = useActionData();

  useEffect(() => {
    notify?.success && toastSuccess(`${notify.success.statusText}`);
  }, [notify]);

  const typeData = useLoaderData();

  const [formInput, setFormInput] = useState(typeData);

  return (
    <>
      <FormContainer title={"Edit Room_type"}>
        <FormDisplay fields={formInput} />
        <FormInputs fields={formInput} setFormInput={setFormInput} />
      </FormContainer>
    </>
  );
}
