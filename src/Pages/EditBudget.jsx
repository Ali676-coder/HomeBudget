// RRD Import
import { useLoaderData, useNavigate } from "react-router-dom";

// helper function Import
import { fetchData } from "../helper";

// react Import
import { useState } from "react";

// library Import
import { toast } from "react-toastify";

const EditBudget = () => {
  const { budget } = useLoaderData();
  const navigate = useNavigate();
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.amount);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allBudgets = fetchData("budgets") ?? [];
    const updatedBudgets = allBudgets.map((b) =>
      b.id === budget.id ? { ...b, name: name.trim(), amount: +amount } : b
    );
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    toast.success("Budget updated!");
    navigate(`/budget/${budget.id}`);
  };

  return (
    <div className="grid-lg">
      <h2>
        <span className="accent">{budget.name}</span> Budget editing
      </h2>
      <form onSubmit={handleSubmit}>
        <label>New Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>New Amount</label>
        <input
          type="number"
          min="0"
          step="100"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn"
          style={{
            marginTop: "20px",
            "--accent": budget.color,
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBudget;

// loader
export const editBudgetLoader = async ({ params }) => {
  const budget = fetchData("budgets").find((b) => b.id === params.id);
  if (!budget) {
    throw new Error("Budget not found!");
  }
  return { budget };
};
