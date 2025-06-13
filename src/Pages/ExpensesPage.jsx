// helper Functions Import
import { fetchData } from "../helper";

// RRD Import
import { useLoaderData } from "react-router-dom";

// helper function Import
import { waait, deleteItem } from "../helper";

// Componetns Import
import Table from "../components/Table";

// library Import
import { toast } from "react-toastify";

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>There are no Expenses to show </p>
      )}
    </div>
  );
};

export default ExpensesPage;

// Start expenses Loader
export const expensesLoader = async () => {
  const expenses = await fetchData("expenses");
  return { expenses };
};
// End expensesLoader Loader

// Start expenses Action
export const expensesAction = async ({ request }) => {
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
};
// End expensesLoader Action
