// // RRD Import
// import { useLoaderData, Link } from "react-router-dom";

// // React Import
// import { useState, useMemo } from "react";

// // helper function Import
// import {
//   waait,
//   deleteItem,
//   createExpense,
//   getAllMatchingItme,
//   groupExpensesByName,
//   groupExpensesByMonth,
//   formatCurrency,
// } from "../helper";

// // Conponents Import
// import BudgetItem from "../components/BudgetItem";
// import AddExpenseForm from "../components/AddExpenseForm";
// import Table from "../components/Table";

// // library
// import { toast } from "react-toastify";

// const BudgetPage = () => {
//   const { budget, expenses } = useLoaderData();

//   // نوع التجميع: "name" أو "month"
//   const [groupBy, setGroupBy] = useState("name");

//   // اختيار نوع التجميع
//   const groupedExpenses = useMemo(() => {
//     if (groupBy === "month") {
//       return groupExpensesByMonth(expenses);
//     }
//     return groupExpensesByName(expenses);
//   }, [expenses, groupBy]);

//   return (
//     <div
//       className="grid-lg"
//       style={{
//         "--accent": budget.color,
//       }}
//     >
//       <h1 className="h2">
//         <span className="accent">{budget.name} </span>
//         Overview
//       </h1>

//       <div className="flex-lg">
//         <BudgetItem budget={budget} showDelete={true} />
//         <Link to={`edit`} className="btn edit">
//           Edit Budget
//         </Link>
//         <AddExpenseForm budgets={[budget]} />
//       </div>

//       {expenses && expenses.length > 0 && (
//         <>
//           <div className="grid-md">
//             <h2>
//               <span className="accent">{budget.name}</span> Expenses
//             </h2>
//             <Table expenses={expenses} showBudget={false} />
//           </div>

//           <div className="grid-md">
//             <h2>
//               <span className="accent">Group By</span>
//             </h2>
//             <div className="flex-sm">
//               <select
//                 value={groupBy}
//                 onChange={(e) => setGroupBy(e.target.value)}
//               >
//                 <option value="name">By Name</option>
//                 <option value="month">By Month</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid-md">
//             <h2>
//               <span className="accent">Total</span>{" "}
//               {groupBy === "month" ? "Per Month" : "Per Item"}
//             </h2>
//             <div className="table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>{groupBy === "month" ? "Month" : "Name"}</th>
//                     <th>Total Quantity</th>
//                     <th>Unit Price</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedExpenses.map((item, index) => (
//                     <tr key={item.name}>
//                       <td>{index + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.quantity}</td>
//                       <td>{formatCurrency(item.unitPrice)}</td>
//                       <td>{formatCurrency(item.amount)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BudgetPage;

// // Start budget Loader
// export const budgetLoader = async ({ params }) => {
//   const budget = await getAllMatchingItme({
//     category: "budgets",
//     key: "id",
//     value: params.id,
//   })[0];
//   const expenses = await getAllMatchingItme({
//     category: "expenses",
//     key: "budgetId",
//     value: params.id,
//   });
//   if (!budget) {
//     throw new Error("The budget you're trying to find doesn't exist!");
//   }
//   return { budget, expenses };
// };
// // End budget Loader

// // Start budget Action
// export const budgetAction = async ({ request }) => {
//   await waait();
//   const data = await request.formData();
//   const { _action, ...values } = Object.fromEntries(data);
//   // delete expense
//   if (_action === "deleteExpense") {
//     try {
//       deleteItem({
//         key: "expenses",
//         id: values.expenseId,
//       });
//       return toast.success(`Expense ${values.expenseName} deleted!`);
//     } catch (error) {
//       throw new Error(`There was a problem deleting your expense.
//           ${error}`);
//     }
//   }
//   // add expense
//   if (_action === "createExpense") {
//     try {
//       createExpense({
//         name: values.newExpense,
//         quantity: values.newExpenseQty,
//         unitPrice: values.newExpenseUnitPrice,
//         budgetId: values.newExpenseBudget,
//       });
//       return toast.success(`Expense ${values.newExpense} Added`);
//     } catch (error) {
//       throw new Error(`There was a problem creating your expense.
//           ${error}`);
//     }
//   }
// };
// // End budget Action
// RRD Import
import { useLoaderData, Link } from "react-router-dom";

// React Import
import { useState, useMemo } from "react";

// helper function Import
import {
  waait,
  deleteItem,
  createExpense,
  getAllMatchingItme,
  groupExpensesByName,
  formatCurrency,
} from "../helper";

// Components Import
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  const [filterMonth, setFilterMonth] = useState("");

  const availableMonths = useMemo(() => {
    const monthsSet = new Set();
    expenses.forEach((expense) => {
      const month = new Date(expense.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      monthsSet.add(month);
    });
    return Array.from(monthsSet);
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    if (!filterMonth) return expenses;
    return expenses.filter((expense) => {
      const expenseMonth = new Date(expense.createdAt).toLocaleString(
        "default",
        {
          month: "long",
          year: "numeric",
        }
      );
      return expenseMonth === filterMonth;
    });
  }, [expenses, filterMonth]);

  const groupedExpenses = useMemo(() => {
    return groupExpensesByName(filteredExpenses);
  }, [filteredExpenses]);

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
        <>
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span> Expenses
            </h2>
            <Table expenses={filteredExpenses} showBudget={false} />
          </div>

          <div className="grid-md">
            <h2>
              Filter by <span className="accent">Month</span>
            </h2>
            <div className="flex-sm">
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {availableMonths.map((monthStr) => (
                  <option key={monthStr} value={monthStr}>
                    {monthStr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-md">
            <h2>
              Filter by <span className="accent">Itme</span>
            </h2>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Total Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedExpenses.map((item, index) => (
                    <tr key={item.name}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.unitPrice)}</td>
                      <td>{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}

                  {filterMonth && (
                    <tr className="total-row">
                      <td
                        colSpan="4"
                        style={{ fontWeight: "bold", textAlign: "right" }}
                      >
                        Total by <span className="accent">{filterMonth}</span>
                      </td>
                      <td className="accent" style={{ fontWeight: "bold" }}>
                        {formatCurrency(
                          groupedExpenses.reduce(
                            (acc, item) => acc + item.amount,
                            0
                          )
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetPage;

// Budget Loader
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

// Budget Action
export const budgetAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense ${values.expenseName} deleted!`);
    } catch (error) {
      throw new Error(`There was a problem deleting your expense. ${error}`);
    }
  }

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
      throw new Error(`There was a problem creating your expense. ${error}`);
    }
  }
};
