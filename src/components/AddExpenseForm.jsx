// RRD Import
import { Form, useFetcher } from "react-router-dom";

// React Import
import { useEffect, useRef, useState } from "react";

// library
import { FaPlusCircle, FaSpinner } from "react-icons/fa";

// helpers
import { getAllMatchingItme } from "../helper";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setQuantity(1);
      setUnitPrice("");
      setSelectedBudgetId(
        budgets.length === 1 ? budgets[0].id : budgets[0]?.id ?? ""
      );
    }
  }, [isSubmitting]);

  // calcualte price Instantly
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState("");
  const [selectedBudgetId, setSelectedBudgetId] = useState(
    budgets.length === 1 ? budgets[0].id : budgets[0]?.id ?? ""
  );
  const total = quantity * unitPrice;

  const currentBudget = budgets.find((b) => b.id === selectedBudgetId);

  const expenses = getAllMatchingItme({
    category: "expenses",
    key: "budgetId",
    value: currentBudget?.id ?? "",
  });

  // Calculate total spent
  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  // Remaining budget
  const remaining = currentBudget ? currentBudget.amount - totalSpent : 0;

  // Check if expense exceeds remaining budget
  const isOverBudget = total > remaining;

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        action=""
        autoComplete="off"
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g. Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseQty">Quantity</label>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="decimal"
              name="newExpenseQty"
              id="newExpenseQty"
              placeholder="e.g. 2"
              required
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                setQuantity(val);
              }}
              onBlur={(e) => {
                const val = +e.target.value;
                if (isNaN(val) || val < 1) {
                  setQuantity(1);
                } else {
                  setQuantity(val);
                }
              }}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseUnitPrice">Unit Price</label>
            <input
              type="number"
              min="500"
              step="100"
              inputMode="decimal"
              name="newExpenseUnitPrice"
              id="newExpenseUnitPrice"
              placeholder="e.g. 1000"
              required
              value={unitPrice}
              onChange={(e) => {
                const val = e.target.value;
                setUnitPrice(val === "" ? "" : +val);
              }}
            />
          </div>
        </div>

        {/* Budget selector if more than one */}
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            required
            value={selectedBudgetId}
            onChange={(e) => setSelectedBudgetId(e.target.value)}
          >
            {budgets.length > 1 && (
              <option value="" disabled hidden>
                Select Budget
              </option>
            )}
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>

        {currentBudget && (
          <p className="small">
            Remaining: <strong>{remaining.toLocaleString()} SYP</strong>
          </p>
        )}

        <p className="total">
          Total: <strong>{isNaN(total) ? 0 : total}</strong> SYP
        </p>

        {isOverBudget && (
          <p
            style={{
              color: "red",
            }}
            className="error"
          >
            You have exceeded the selected budget.
          </p>
        )}

        <input type="hidden" name="_action" value="createExpense" />
        <button
          type="submit"
          className="btn btn--dark"
          disabled={isSubmitting || isOverBudget}
        >
          {isSubmitting ? (
            <>
              <span>Adding...</span>
              <FaSpinner className="spinner" width={20} />
            </>
          ) : (
            <>
              <span>{isOverBudget ? "Over Budget!" : "Add Expense"}</span>
              <FaPlusCircle width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
