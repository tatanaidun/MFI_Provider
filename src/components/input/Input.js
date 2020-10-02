import React from "react";
import "./Input.css";

const Input = (props) => {
  const { type, placeholder, onChangeHandler, value, label } = props;
  return (
    <div>
      <input
        className="input"
        type={type}
        aria-label={label}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value || ""}
        required={true}
      />
    </div>
  );
};

export default Input;
