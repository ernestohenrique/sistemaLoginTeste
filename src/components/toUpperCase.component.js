import React, { useState } from "react";
/*
function UppercaseInput({ label }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  );
}

export default UppercaseInput;
*/
function UppercaseInput({ label, ...restProps }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleInputChange}
        {...restProps}
      />
    </div>
  );
}

export default UppercaseInput;
