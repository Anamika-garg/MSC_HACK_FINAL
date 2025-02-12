import React from "react";



const Input = ({ type, placeholder, value, onChange, className }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 rounded-xl border-2 border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none ${className}`}
    />
  );

  export default Input;