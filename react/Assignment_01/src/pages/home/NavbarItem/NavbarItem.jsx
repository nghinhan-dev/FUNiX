import React from "react";

export default function NavbarItem({ title, icon, active }) {
  return (
    <div className={active && "active"}>
      <i className={`${icon}`}></i>
      <p>{title}</p>
    </div>
  );
}
