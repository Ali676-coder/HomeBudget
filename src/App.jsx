import React from "react";

// Start Reat Router Dom Import
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// End Reat Router Dom Import

// Start Library Import

// Start React toastify
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// End React toastify

// End Library Import

// Start Layouts Import
import Main from "./Layouts/Main";
// End Layouts Import

// Start Pages Import
import DashBoard from "./Pages/DashBoard";
import Error from "./Pages/Error";
import ExpensesPage from "./Pages/ExpensesPage";
import BudgetPage from "./Pages/BudgetPage";
import EditBudget from "./Pages/EditBudget";
// End Pages Import

// Start Loader Import
import { dashBoardLoader } from "./Pages/DashBoard";
import { mainLoader } from "./Layouts/Main";
import { expensesLoader } from "./Pages/ExpensesPage";
import { budgetLoader } from "./Pages/BudgetPage";
import { editBudgetLoader } from "./Pages/EditBudget";
// End Loader Import

// Start Actions Import
import { logoutAction } from "./Actions/logout";
import { deleteBudget } from "./Actions/deleteBudget";
import { dashBoardAction } from "./Pages/DashBoard";
import { expensesAction } from "./Pages/ExpensesPage";
import { budgetAction } from "./Pages/BudgetPage";
// End Actions Import

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Main />}
      loader={mainLoader}
      errorElement={<Error />}
    >
      <Route
        index
        element={<DashBoard />}
        loader={dashBoardLoader}
        action={dashBoardAction}
        errorElement={<Error />}
      />
      <Route
        path="budget/:id"
        element={<BudgetPage />}
        loader={budgetLoader}
        action={budgetAction}
        errorElement={<Error />}
      >
        <Route path="delete" action={deleteBudget} />
      </Route>

      <Route
        path="budget/:id/edit"
        element={<EditBudget />}
        loader={editBudgetLoader}
        errorElement={<Error />}
      />

      <Route
        path="expenses"
        element={<ExpensesPage />}
        loader={expensesLoader}
        action={expensesAction}
        errorElement={<Error />}
      />
      <Route path="logout" action={logoutAction} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
        limit={3}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </div>
  );
}

export default App;
