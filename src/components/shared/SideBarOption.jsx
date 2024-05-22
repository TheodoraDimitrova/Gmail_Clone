import React from "react";

export default function SideBarOption({
  icon,
  title,
  isActive,
  onClick,
  number,
}) {
  return (
    <div className={`sideOption ${isActive ? "active" : ""}`} onClick={onClick}>
      {icon}
      <div className="sideOptionExtended">
        <span>{title}</span>
        <span>{number}</span>
      </div>
    </div>
  );
}
