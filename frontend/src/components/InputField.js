import React from "react";

const InputField = (props) => {
  return (
    <div className="form__group form__group">
      <label htmlFor={props?.props?.id}>{props?.props?.label}</label>
      <input
        id={props?.props?.id}
        name={props?.props?.name}
        type={props?.props?.type}
        placeholder={props?.props?.placeholder}
        required={!!props.props.required}
        value={props?.props?.value} // Set the value of the input
        onChange={props?.props?.onChange} // Set the onChange handler
      />
    </div>
  );
};

export default InputField;
