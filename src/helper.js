// loading function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 1000));

// Random Vibrant Colors
export const generateRandomColors = () => {
  const baseColors = [
    "0 100% 50%",
    "25 100% 50%",
    "50 100% 50%",
    "135 100% 40%",
    "245 100% 60%",
    "290 100% 65%",
  ];

  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return baseColors[existingBudgetsLength % baseColors.length];
};

// Start local storage

// get Item
export const fetchData = (key) => {
  try {
    const value = localStorage.getItem(key);

    if (!value || value === "undefined") return null;

    return JSON.parse(value);
  } catch (error) {
    console.error(`خطأ في قراءة ${key} من localStorage:`, error);
    return null;
  }
};

// Start Get all items from local storage
export const getAllMatchingItme = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};
// End Get all items from local storage

// create budget

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColors(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create Expense
export const createExpense = ({ name, quantity, unitPrice, budgetId }) => {
  const amount = +quantity * +unitPrice;
  const newItem = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: name,
    quantity: +quantity,
    unitPrice: +unitPrice,
    createdAt: Date.now(),
    amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// delete item from localStorage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// End local storage

// Start total spent by budget
export const calcualteSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if the expense.id === budgetId I passed
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// End total spent by budget

// Start Formatting

// Start Format Date
export const formatDate = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};
// End Format Date

// Start formatting percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
// End formatting percentages

// Start format currency
export const formatCurrency = (amt) => {
  if (typeof amt !== "number") return "Invalid amount";
  return `${amt.toLocaleString()} SYP`;
};
// End format currency

// End Formatting

// Start group Expenses ByName

export const groupExpensesByName = (expenses) => {
  const grouped = {};

  expenses.forEach((expense) => {
    if (!grouped[expense.name]) {
      grouped[expense.name] = {
        name: expense.name,
        quantity: 0,
        unitPrice: expense.unitPrice,
        amount: 0,
      };
    }
    grouped[expense.name].quantity += expense.quantity;
    grouped[expense.name].amount += expense.quantity * expense.unitPrice;
  });

  return Object.values(grouped);
};

// End group Expenses ByName

// Start filter by month

export const groupExpensesByMonth = (expenses) => {
  const grouped = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.createdAt);
    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!grouped[month]) {
      grouped[month] = {
        name: month,
        quantity: 0,
        amount: 0,
        unitPrice: 0,
      };
    }

    const quantity = Number(expense.quantity);
    const unitPrice = Number(expense.unitPrice);
    const total = quantity * unitPrice;

    grouped[month].quantity += quantity;
    grouped[month].amount += total;
    grouped[month].unitPrice = unitPrice;
  });

  return Object.values(grouped);
};

// Start filter by month
