import React from "react";
import ToolTip from "@mui/material/Tooltip";

const Button = ({
  abbrTitle,
  className,
  onClickHandler,
  value,
}) => {
  return (
    <ToolTip title={<span style={{ fontSize: "small"}}>{abbrTitle}</span>} arrow>
      <button className={className} onClick={onClickHandler}>
        {value}
      </button>
    </ToolTip>
  );
};

export default Button;
