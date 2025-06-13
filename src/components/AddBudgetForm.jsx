// RRD Import
import { Form, useFetcher } from "react-router-dom";
// React Import
import { useEffect, useRef } from "react";
// library
import { FaDollarSign, FaSpinner } from "react-icons/fa";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form
        method="post"
        autoComplete="off"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="Groceries"
            required
            ref={focusRef}
          />
          <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input
              type="number"
              step="100"
              min="500"
              name="newBudgetAmount"
              id="newBudgetAmount"
              placeholder="e.g. 350000 S.P"
              required
              inputMode="decimal"
            />
          </div>
          <input type="hidden" name="_action" value="createBudget" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Submitting...</span>
                <FaSpinner className="spinner" width={20} />
              </>
            ) : (
              <>
                <span>Create Budget</span>
                <FaDollarSign width={20} />
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
