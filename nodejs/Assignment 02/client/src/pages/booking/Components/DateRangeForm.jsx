import React from "react";
import { DateRange } from "react-date-range";

export default function DateRangeForm({ selecDateHandler, dateInput }) {
  return (
    <div className="date_range">
      <p className="title">Date</p>
      <DateRange
        className="bookingCalendar"
        editableDateInputs={true}
        onChange={(item) => selecDateHandler(item.selection)}
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
