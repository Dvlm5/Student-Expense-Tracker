# Student Expense Tracker

A full-stack web application for tracking student expenses with separate frontend and backend folders.

## Project Structure

```
student-expense-tracker/
├── backend/
│   └── app.py                 # Flask backend application
├── frontend/
│   ├── student_expense_tracker (1).html  # Complex frontend (main app)
│   ├── style.css              # CSS for complex frontend
│   ├── templates/
│   │   └── homepage.html      # Simple frontend
│   └── static/
│       ├── style.css          # CSS for simple frontend
│       └── script.js          # JavaScript for simple frontend
└── README.md                  # This file
```

## Installation & Setup

1. Ensure Python 3.7+ is installed
2. Navigate to the backend folder:
   ```
   cd backend
   ```
3. Create and activate virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
4. Install Flask:
   ```
   pip install flask
   ```
5. Run the application:
   ```
   python app.py
   ```
6. Open your browser and go to:
   ```
   http://127.0.0.1:5000
   ```

## Features

### Complex Frontend (Main App)
- Add expenses with description, amount, category, date, payment mode, month
- Categories: Food & Dining, Transport, Books & Supplies, Health & Medicine, Entertainment, Rent & Utilities, Clothing, Other
- Real-time total expense calculation
- Dynamic expense list with delete functionality
- Budget management per category
- Visual charts and analytics using Chart.js
- Responsive design with modern UI

### Simple Frontend
- Basic expense tracking
- Add, view, and delete expenses
- Clean, minimal interface
- Accessible at `http://127.0.0.1:5000/simple`

## API Endpoints

- `GET /api/expenses` - Retrieve all expenses
- `POST /api/expenses` - Add new expense
- `DELETE /api/expenses/<id>` - Delete expense
- `GET /api/budgets` - Get budget settings
- `PUT /api/budgets` - Update budgets

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Styling**: Custom CSS with gradients and animations

## Notes

- Data is stored in memory (resets on server restart)
- No database required for this implementation
- Designed for educational purposes and easy understanding
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with gradients, shadows, and animations

## Notes

- Data is stored in memory (resets on server restart)
- No database required for this simple implementation
- Designed to be beginner-friendly and easy to understand