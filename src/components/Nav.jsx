import { useState } from "react";
import { NavLink, useSubmit } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import logomark from "../assets/logomark_corrected.svg";

const Nav = ({ userName }) => {
  const [showModal, setShowModal] = useState(false);
  const submit = useSubmit();

  const handleDelete = () => {
    submit(null, { method: "post", action: "/HomeBudget/logout" });
    setShowModal(false);
  };

  return (
    <>
      <nav className="nav">
        <NavLink to="/" aria-label="Go To Home" className="nav-logo">
          <img src={logomark} alt="Logo" height={30} />
          <span className="nav-title">HomeBudget</span>
        </NavLink>

        {userName && (
          <button
            type="button"
            className="btn btn--warning"
            onClick={() => setShowModal(true)}
          >
            <span>Delete User</span>
            <FaTrash />
          </button>
        )}
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="nav-warning">
              <h2>Warning</h2>
            </div>
            <p>Are you sure you want to delete your account and all data?</p>
            <div className="modal-buttons">
              <button className="btn-danger" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
