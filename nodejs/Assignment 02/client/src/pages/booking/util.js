import { toast } from "react-toastify";

export function updateCheckBox(map, selection, rooms) {
  map.forEach(unCheck);
  map.forEach(unDisabled);
  validateDateRange(map, selection, rooms);
}

export function validateDateRange(map, selection, rooms) {
  // key = input
  // value = number

  for (const room of rooms) {
    for (const { startDate, endDate } of room.bookedRange) {
      const currentStart = new Date(startDate);
      const currentEnd = new Date(endDate);

      if (
        !(
          selection.startDate >= currentEnd || selection.endDate <= currentStart
        )
      ) {
        console.log("I'm dedge");
        const numberRoom = room.number;
        const node = map.get(numberRoom);
        node.disabled = true;
      }
    }
  }
}

export function unCheck(key) {
  return (key.checked = false);
}

export function unDisabled(key) {
  console.log("key:", key);
  return (key.disabled = false);
}

// action
export async function booking({ request }) {
  const errors = {};
  const data = Object.fromEntries(await request.formData());

  // Validate
  if (data.total * 1 === 0) {
    return toast.error("Please choose room!");
  }

  if (data.email.length === 0) {
    errors.email = "Email cannot be empty";
  }

  if (data.fullName.length === 0) {
    errors.fullName = "FullName cannot be empty";
  }

  if (data.method === "") {
    errors.method = "Please choose payment method";
  }

  if (isNaN(data.phoneNumber) || data.phoneNumber.length !== 10) {
    errors.phoneNumber = "Phone number must be number and 10 characters";
  }

  if (isNaN(data.identifyNumber) || data.identifyNumber.length !== 12) {
    errors.identifyNumber = "Identify number must be number and 12 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  console.log(data);

  try {
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(res.message);
    }

    return toast.success("Booked");
  } catch (error) {
    console.log("error:", error);
  }
}
