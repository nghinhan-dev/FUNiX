import { useState } from "react";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormDisplay from "../../ReusableComponent/FormDisplay";
import FormInputs from "../../ReusableComponent/FormInputs";

export default function AddRoom() {
  const [formInput, setFormInput] = useState({
    number: "",
    bookedRange: [],
  });

  return (
    <>
      <FormContainer title={"Add Room"}>
        <FormDisplay fields={formInput} />
        <FormInputs fields={formInput} setFormInput={setFormInput} />
      </FormContainer>
    </>
  );
}
