export function updateCheckBox(range, map, selection, rooms) {
  if (JSON.stringify(range) === JSON.stringify([0, 0])) {
    map.forEach(unCheck);
    map.forEach(unDisabled);
    validateDateRange(map, selection, rooms);
  }
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
        const numberRoom = room.number;
        const node = map.get(numberRoom);
        node.disabled = true;
      }
    }
  }
}

export function unCheck(key, value) {
  return (key.checked = false);
}

export function unDisabled(key, value) {
  return (key.disabled = false);
}

export async function booking({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log("data:", data);

  return 1;
}
