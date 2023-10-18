import React from "react";

export default function UserInfoForm() {
  return (
    <div className="info-container">
      <p className="title">Reserve Information</p>
      <div className="info-form">
        <label>
          Your Full Name:
          <input type="text" name="fullName" />
        </label>
        <label>
          Your Email:
          <input type="email" name="email" />
        </label>
        <label>
          Your Phone Number:
          <input type="number" name="phoneNumber" />
        </label>
        <label>
          Your Identify Card Number:
          <input type="number" name="identifyNumber" />
        </label>
      </div>
    </div>
  );
}
