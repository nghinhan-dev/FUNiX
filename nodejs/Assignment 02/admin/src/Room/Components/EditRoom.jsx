import { useState } from "react";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";
import { useLoaderData } from "react-router-dom";

export default function EditRoom() {
  const roomData = useLoaderData();

  const [formInput, setFormInput] = useState(roomData);

  return (
    <>
      <FormContainer title={"Edit Room"}>
        <FormDisplay fields={formInput} />
        <FormInputs fields={formInput} setFormInput={setFormInput} />
      </FormContainer>
    </>
  );
}
