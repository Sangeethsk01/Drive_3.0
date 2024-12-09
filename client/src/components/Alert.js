import React from "react";
import "./Alert.css";
const Alert = ({ message }) => {

  return (
    <div className="alertBox">
      { message && <strong>{message}</strong>}
    </div>
  );
};

export default Alert;
