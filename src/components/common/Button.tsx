import React from "react";

interface Props {
  abbrTitle?: string;
  className?: string;
  onClickHandler?: () => void;
  value?: JSX.Element | string;
}

const Button: React.FC<Props> = ({
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
