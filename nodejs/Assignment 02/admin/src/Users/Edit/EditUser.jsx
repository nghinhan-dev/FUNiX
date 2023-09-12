import { useActionData, useLoaderData } from "react-router-dom";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";
import { useEffect, useState } from "react";
import { toastSuccess } from "../../util/toast";

export default function EditUser() {
  const data = useLoaderData();
  const notify = useActionData();

  useEffect(() => {
    notify?.success &&
      toastSuccess(`Update ${notify.success.username} account!`);
  }, [notify]);

  const [userData, setUserData] = useState(data);

  return (
    <>
      <FormContainer title="Edit User">
        <FormDisplay fields={userData} />
        <FormInputs fields={userData} setFormInput={setUserData} />
      </FormContainer>
    </>
  );
}
