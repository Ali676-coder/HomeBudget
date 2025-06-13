import React from "react";

const Footer = () => {
  return (
    <div className="fotter">
      <small>
        &copy; {new Date().getFullYear()} - Budgeting App. All rights reserved.
      </small>
    </div>
  );
};

export default Footer;
