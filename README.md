# project-template

## Backend

This folder contains the backend application built using **Python Flask** for the Cloud-Native E-Commerce Inventory System / Stock Data System developed during my internship.

### 📦 Technologies & Libraries Used:
- **Flask==3.0.2** — Micro web framework for building the API
- **Flask-Cors==4.0.0** — Enable CORS for frontend-backend communication
- **requests==2.31.0** — To make HTTP requests (e.g., to external APIs)
- **python-dotenv==1.0.1** — Load environment variables from `.env`
- **yfinance==0.2.37** — Retrieve real-time stock market data
- **pandas==2.2.1** — Data manipulation and processing

### 📁 Folder Structure (Example)


### ⚙️ How to Run

1. **Set up virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

FLASK_APP=app.py
FLASK_ENV=development

flask run

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py


cd frontend
npm install
npm run dev