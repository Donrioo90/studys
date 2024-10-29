# Study Buddy

Study Buddy is a full-stack web application designed to help users find and join study groups easily. The application consists of a React frontend and a Flask backend, providing a smooth user experience and robust functionalities.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Features
- User authentication (sign up, login, password reset)
- View and join study groups
- User profiles with personal information
- Protected routes for authenticated users

## Tech Stack
- **Frontend**: React, Redux, React Router, Bootstrap/TailwindCSS
- **Backend**: Flask, Flask-CORS, Flask-SQLAlchemy, Flask-JWT-Extended
- **Database**: SQLite (can be configured for PostgreSQL or other databases)
- **Deployment**: Heroku (for backend), Vercel/Netlify (for frontend)

## Getting Started

### Prerequisites
- Python 3.x
- Node.js (14.x or higher)
- npm (Node Package Manager)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:Thazar-r/study-buddy.git
   cd study-buddy/backend
Create a virtual environment:

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install backend dependencies:

bash
Copy code
pip install -r requirements.txt
Set up environment variables: Create a .env file in the backend directory with the following content:

makefile
Copy code
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///studybuddy.db  # or your database connection string
JWT_SECRET_KEY=your_jwt_secret_key
Initialize the database:

bash
Copy code
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
Run the backend server:

bash
Copy code
python app.py
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install frontend dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the frontend directory with the following content:

arduino
Copy code
REACT_APP_API_URL=http://localhost:5000
Run the frontend application:

bash
Copy code
npm start
API Endpoints
POST /signup: Create a new user.
POST /login: Log in an existing user.
POST /reset-password: Reset user password.
GET /profile: Get the logged-in user's profile information (protected route).
Deployment
Instructions for deploying the backend and frontend will be provided in detail. You can deploy the backend on Heroku and the frontend on Vercel/Netlify.

License
This project is licensed under the MIT License. See the LICENSE file for more information.

vbnet
Copy code



