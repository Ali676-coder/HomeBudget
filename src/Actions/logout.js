// Logout Action

import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
// react toastify
import { toast } from "react-toastify";

export const logoutAction = () => {
  // delete User
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  toast.success("you've delete your account successfully!");

  //   return redirect
  return redirect("/");
};
