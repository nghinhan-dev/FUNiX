import { useActionData } from "react-router-dom";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";
import { toastSuccess } from "../../util/toast";

import { useEffect, useState } from "react";

export default function AddHotel() {
  const notify = useActionData();

  useEffect(() => {
    notify?.success && toastSuccess(`${notify.success.statusText}`);
  }, [notify]);

  const [formFields, setFormFields] = useState({
    address: "",
    cheapestPrice: "",
    city: "",
    desc: "",
    distance: "",
    featured: false,
    name: "",
    photos: [],
    rooms: [],
    title: "",
    type: [],
    rating: "",
  });

  return (
    <>
      <FormContainer title={"Add Hotel"}>
        <FormDisplay fields={formFields} />
        <FormInputs fields={formFields} setFormInput={setFormFields} />
      </FormContainer>
    </>
  );
}
