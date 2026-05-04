// ...existing code...

// Load expenses from server
async function loadExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        expenses.forEach(expense => addExpenseToList(expense));
        updateTotal();
    } catch (error) {
        console.error('Error loading expenses:', error);
    }
}

// Add expense to the list
function addExpenseToList(expense) {
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
        <div class="expense-info">
            <div class="expense-description">${expense.description}</div>
            <div class="expense-details">₹${expense.amount.toFixed(2)} • ${getCategoryEmoji(expense.category)}</div>
        </div>
        <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expensesList.appendChild(li);
}

// Delete expense
async function deleteExpense(id) {
    try {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Remove from DOM
            const expenseItem = document.querySelector(`button[onclick="deleteExpense(${id})"]`).parentElement;
            expenseItem.remove();
            updateTotal();
        } else {
            alert('Error deleting expense');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting expense');
    }
}

// Update total amount
function updateTotal() {
    const total = Array.from(expensesList.children).reduce((sum, li) => {
        const amountText = li.querySelector('.expense-details').textContent;
        const amount = parseFloat(amountText.split(' ')[0].substring(1));
        return sum + amount;
    }, 0);
    totalAmountSpan.textContent = total.toFixed(2);
}

// Get emoji for category
function getCategoryEmoji(category) {
    const emojis = {
        'food': '🍔',
        'travel': '🚗',
        'shopping': '🛍️',
        'other': '📦'
    };
    return emojis[category] || '📦';
}