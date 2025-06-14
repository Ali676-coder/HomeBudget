// loading function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 1000));

// Random Colors
export const generateRandomColors = () => {
  const baseColors = [
    "0 85% 55%", // أحمر دافئ
    "25 80% 55%", // برتقالي غني
    "257.54 100% 50%", // ذهبي أصفر
    "135 60% 50%", // أخضر معتدل
    "245 65% 60%", // أزرق بنفسجي
    "290 60% 60%", // بنفسجي وردي جذاب
  ];

  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return baseColors[existingBudgetsLength % baseColors.length];
};

// Start local storage

// get Item
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
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
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
