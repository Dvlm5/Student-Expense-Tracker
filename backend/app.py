from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
app.static_folder = '../frontend'
app.template_folder = '../frontend/templates'

# In-memory storage for expenses and budgets
expenses = []
budgets = { 'food':0, 'transport':0, 'books':0, 'health':0, 'entertainment':0, 'rent':0, 'clothing':0, 'other':0 }

@app.route('/')
def home():
    return send_from_directory('../frontend', 'student_expense_tracker (1).html')

@app.route('/style.css')
def style():
    return send_from_directory('../frontend', 'style.css')

@app.route('/simple')
def simple():
    return render_template('homepage.html')

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    return jsonify(expenses)

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    with open('debug.log', 'a') as f:
        f.write(f"Received data: {data}\n")
    desc = data.get('desc') or data.get('description')
    amount = data.get('amount')
    cat = data.get('cat') or data.get('category')
    date = data.get('date')
    mode = data.get('mode')
    month = data.get('month')
    with open('debug.log', 'a') as f:
        f.write(f"Parsed: desc={desc}, amount={amount}, cat={cat}\n")
    try:
        amount = float(amount)
    except (TypeError, ValueError):
        amount = 0
    if desc and amount > 0 and cat:
        expense = {
            'id': len(expenses) + 1,
            'desc': desc,
            'amount': amount,
            'cat': cat,
            'date': date,
            'mode': mode,
            'month': month
        }
        expenses.append(expense)
        with open('debug.log', 'a') as f:
            f.write(f"Added expense: {expense}\n")
        return jsonify(expense)
    with open('debug.log', 'a') as f:
        f.write("Invalid data\n")
    return jsonify({'error': 'Invalid data'}), 400

@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    global expenses
    expenses = [e for e in expenses if e['id'] != expense_id]
    return jsonify({'success': True})

@app.route('/api/budgets', methods=['GET'])
def get_budgets():
    return jsonify(budgets)

@app.route('/api/budgets', methods=['PUT'])
def update_budgets():
    global budgets
    budgets = request.get_json()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)