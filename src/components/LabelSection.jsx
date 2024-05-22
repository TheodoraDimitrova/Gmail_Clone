import React from "react";
// Създай този файл за CSS стиловете

const LabelSection = () => {
  return (
    <div className="label-section">
      <span className="label-heading" role="heading">
        Labels
      </span>
      <div
        className="create-label-button"
        aria-label="Create new label"
        data-tooltip="Create new label"
        role="button"
        tabIndex="0"
        onClick={() => alert("Create new label clicked")}
      ></div>
    </div>
  );
};

export default LabelSection;
