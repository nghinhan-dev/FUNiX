import { useState } from "react";
import FormContainer from "../ReusableComponent/FormContainer";
import FormDisplay from "../ReusableComponent/FormDisplay";
import FormInputs from "../ReusableComponent/FormInputs";

export default function AddRoom() {
  const [formInput, setFormInput] = useState({
    number: 101,
    bookedRange: [
      {
        _id: "65000dbe298bac3b61c9daae",
        startDate: "2023-08-20T00:00:00.000Z",
        endDate: "2023-08-22T00:00:00.000Z",
      },
    ],
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
