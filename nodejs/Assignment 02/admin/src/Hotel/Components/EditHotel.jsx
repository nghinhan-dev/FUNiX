import { useState } from "react";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";
import { useActionData, useLoaderData } from "react-router-dom";

export default function EditHotel() {
  const hotelData = useLoaderData();
  const notify = useActionData();
  console.log("notify:", notify);

  const [formInput, setFormInput] = useState(hotelData);

  return (
    <>
      <FormContainer title={"Edit Hotel"}>
        <FormDisplay fields={formInput} />
        <FormInputs fields={formInput} setFormInput={setFormInput} />
      </FormContainer>
    </>
  );
}
