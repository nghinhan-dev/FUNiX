import FormContainer from "../ReusableComponent/FormContainer";
import FormDisplay from "../ReusableComponent/FormDisplay";
import FormInputs from "../ReusableComponent/FormInputs";

import { useState } from "react";

export default function AddHotel() {
  const [formFields, setFormFields] = useState({
    address: "",
    cheapestPrice: "",
    city: "",
    desc: "",
    distance: "",
    featured: "",
    name: "",
    photos: [],
    rooms: ["6310dd998cfecfd90b30ca29", "6310dd998cfecfd90b30ca2a"],
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