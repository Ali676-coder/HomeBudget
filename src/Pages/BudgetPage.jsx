// RRD Import
import { useLoaderData, Link } from "react-router-dom";

// helper function Import
import {
  waait,
  deleteItem,
  createExpense,
  getAllMatchingItme,
} from "../helper";

// Conponents Import
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <Link to={`edit`} className="btn edit">
          Edit Budget
        </Link>
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;

// Start budget Loader
export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItme({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItme({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist!");
  }
  return { budget, expenses };
};
// End budget Loader

// Start budget Action
export const budgetAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // delete expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense ${values.expenseName} deleted!`);
    } catch (error) {
      throw new Error(`There was a problem deleting your expense.
          ${error}`);
    }
  }
  // add expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        quantity: values.newExpenseQty,
        unitPrice: values.newExpenseUnitPrice,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} Added`);
    } catch (error) {
      throw new Error(`There was a problem creating your expense.
          ${error}`);
    }
  }
};
// End budget Action
