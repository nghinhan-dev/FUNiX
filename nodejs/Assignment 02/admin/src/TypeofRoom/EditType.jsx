import { useState } from "react";
import FormContainer from "../ReusableComponent/FormContainer";
import FormDisplay from "../ReusableComponent/FormDisplay";
import FormInputs from "../ReusableComponent/FormInputs";
import { useLoaderData } from "react-router-dom";

export default function EditType() {
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
