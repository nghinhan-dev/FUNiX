import React from "react";

export default function NavbarItem({ title, icon, active, itemOnclick }) {
  return (
    <div onClick={itemOnclick} className={active ? "active" : null}>
      <i className={`${icon}`}></i>
      <p>{title}</p>
    </div>
  );
}
