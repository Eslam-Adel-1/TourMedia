import React from "react";

const BasicContainer = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col item-center bg-white rounded-lg shadow-md p-4 mb-5 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default BasicContainer;
