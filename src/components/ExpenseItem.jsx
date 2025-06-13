// helper Import
import { formatCurrency, getAllMatchingItme, formatDate } from "../helper";

// RRD Import
import { Link, Form, useFetcher } from "react-router-dom";

// library
import { FaTrash, FaSpinner } from "react-icons/fa";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const budget = getAllMatchingItme({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{expense.quantity}</td>
      <td>{formatCurrency(expense.unitPrice)}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            style={{ "--accent": budget.color }}
            to={`/budget/${budget.id}`}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <input type="hidden" name="expenseName" value={expense.name} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" width={20} />
              </>
            ) : (
              <>
                <FaTrash width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
