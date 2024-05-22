import React from "react";

export default function Section({ icon, title, selected, onClick }) {
  return (
    <div className={`section  ${selected ? "selected" : ""}`} onClick={onClick}>
      {icon}
      <p>{title}</p>
    </div>
  );
}
