import React from "react";
import { DateRange } from "react-date-range";
import { updateCheckBox } from "../util";

export default function DateRangeForm({
  selecDateHandler,
  mapItems,
  checkArray,
  dateInput,
}) {
  return (
    <div className="date_range">
      <p className="title">Date</p>
      <DateRange
        className="bookingCalendar"
        editableDateInputs={true}
        onChange={(item) => selecDateHandler(item.selection)}
        onRangeFocusChange={(range) => {
          updateCheckBox(range, mapItems, dateInput, checkArray);
        }}
        ranges={dateInput}
      />
      <input
        type="hidden"
        name="dateStart"
        defaultValue={dateInput[0].startDate}
      />
      <input type="hidden" name="dateEnd" defaultValue={dateInput[0].endDate} />
    </div>
  );
}
