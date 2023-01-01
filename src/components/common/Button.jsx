import React from "react";

const Button = ({
  abbrTitle,
  className,
  onClickHandler,
  value,
}) => {
  return (
    <abbr title={abbrTitle}>
      <button className={className} onClick={onClickHandler}>
        {value}
      </button>
    </abbr>
  );
};

export default Button;
