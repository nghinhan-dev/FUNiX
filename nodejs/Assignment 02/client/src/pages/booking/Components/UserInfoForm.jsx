import React from "react";
import { useUser } from "../../../context/UserContext";

export default function UserInfoForm({ errors }) {
  const { user } = useUser();

  return (
    <div className="info-container">
      <input type="hidden" name="user" defaultValue={user?.username} />
      <p className="title">Reserve Information</p>
      <div className="info-form">
        <label>
          Your Full Name:
          <input type="text" name="fullName" defaultValue={user?.fullName} />
          {errors?.fullName && (
            <span className="error-msg">{errors.fullName}</span>
          )}
        </label>
        <label>
          Your Email:
          <input type="email" name="email" defaultValue={user?.email} />
          {errors?.email && <span className="error-msg">{errors.email}</span>}
        </label>
        <label>
          Your Phone Number:
          <input
            type="number"
            name="phoneNumber"
            defaultValue={user?.phoneNumber}
          />
          {errors?.phoneNumber && (
            <span className="error-msg">{errors.phoneNumber}</span>
          )}
        </label>
        <label>
          Your Identify Card Number:
          <input type="number" name="identifyNumber" />
          {errors?.identifyNumber && (
            <span className="error-msg">{errors.identifyNumber}</span>
          )}
        </label>
      </div>
    </div>
  );
}
