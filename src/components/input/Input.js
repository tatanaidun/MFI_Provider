import React from "react";
import "./Input.css";

function Input(props) {
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
        required
      />
    </div>
  );
}

export default Input;
