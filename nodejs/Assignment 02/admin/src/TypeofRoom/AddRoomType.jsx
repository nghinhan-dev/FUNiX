import FormContainer from "../ReusableComponent/FormContainer";
import FormDisplay from "../ReusableComponent/FormDisplay";
import FormInputs from "../ReusableComponent/FormInputs";

import { useState } from "react";

export default function AddRoomType() {
  const [formFields, setFormFields] = useState({
    desc: "",
    maxPeople: "",
    price: "",
    rooms: [],
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
