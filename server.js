const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Data files
const EXPENSES_FILE = path.join(__dirname, 'expenses.json');
const BUDGETS_FILE = path.join(__dirname, 'budgets.json');

// Helper functions
function loadExpenses() {
  try {
    const data = fs.readFileSync(EXPENSES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveExpenses(expenses) {
  fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
}

function loadBudgets() {
  try {
    const data = fs.readFileSync(BUDGETS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { food: 0, transport: 0, books: 0, health: 0, entertainment: 0, rent: 0, clothing: 0, other: 0 };
  }
}

function saveBudgets(budgets) {
  fs.writeFileSync(BUDGETS_FILE, JSON.stringify(budgets, null, 2));
}

// Routes
app.get('/api/expenses', (req, res) => {
  const expenses = loadExpenses();
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const { desc, amount, cat, date, mode, month } = req.body;
  if (!desc || !amount || !cat) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const expenses = loadExpenses();
  const newExpense = {
    id: Date.now(),
    desc,
    amount: parseFloat(amount),
    cat,
    date,
    mode,
    month
  };
  expenses.push(newExpense);
  saveExpenses(expenses);
  res.json(newExpense);
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let expenses = loadExpenses();
  const initialLength = expenses.length;
  expenses = expenses.filter(e => e.id !== id);
  if (expenses.length === initialLength) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  saveExpenses(expenses);
  res.json({ success: true });
});

app.get('/api/budgets', (req, res) => {
  const budgets = loadBudgets();
  res.json(budgets);
});

app.put('/api/budgets', (req, res) => {
  const budgets = req.body;
  saveBudgets(budgets);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});</content>
<parameter name="filePath">c:\Users\Abhay\Downloads\New folder (2)\server.js