// helper Functions Import
import {
  createBudget,
  createExpense,
  fetchData,
  waait,
  deleteItem,
} from "../helper";
// RRD Import
import { Link, useLoaderData } from "react-router-dom";

//  components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
// react toastify
import { toast } from "react-toastify";

const DashBoard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => {
                    return <BudgetItem key={budget.id} budget={budget} />;
                  })}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="gird-md">
                    <h2 className="recent">Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.CreatedAt - a.CreatedAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgetting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default DashBoard;

// Start DashBoard Loader
export const dashBoardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};
// End DashBoard Loader

// Start DashBoard Action
export const dashBoardAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (error) {
      throw Error(`There was a problem creating your account.
        ${error}`);
    }
  }
  // add budget
  if (_action === "createBudget") {
    try {
      // create budget function
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(`Budget ${values.newBudget} Created`);
    } catch (error) {
      throw new Error(`There was a problem creating your budget.
        ${error}`);
    }
  }
  // add expense
  if (_action === "createExpense") {
    try {
      // create expense function
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
};
// End DashBoard Action
