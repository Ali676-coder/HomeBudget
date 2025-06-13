// // helper Functions Import
import {
  calcualteSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helper";

// RRD Import
import { Form, Link } from "react-router-dom";

// library
import { FaInfo, FaTrash } from "react-icons/fa";

// React Import
import { useState } from "react";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calcualteSpentByBudget(id);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="budget"
        style={{
          "--accent": color,
        }}
      >
        <div className="progress-text">
          <h3>{name}</h3>
          <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
          {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spent)} Spent</small>
          <small>{formatCurrency(amount - spent)} remaining</small>
        </div>

        {showDelete ? (
          <div className="flex-sm">
            <button
              type="button"
              className="btn btn--warning"
              onClick={() => setShowModal(true)}
            >
              <span>Delete Budget</span>
              <FaTrash width={20} />
            </button>
          </div>
        ) : (
          <div className="flex-sm">
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <FaInfo width={20} />
            </Link>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="nav-warning">
              <h2>Warning</h2>
            </div>
            <p>Are you sure you want to delete this budget and all its data?</p>
            <Form method="post" action="delete" className="modal-buttons">
              <input type="hidden" name="budgetId" value={id} />
              <button type="submit" className="btn-danger">
                Delete
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetItem;
