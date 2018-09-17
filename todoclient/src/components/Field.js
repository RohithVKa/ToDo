import React from "react";


const Field = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <div>{error}</div>)}
    </div>
  </div>
);




export default Field;