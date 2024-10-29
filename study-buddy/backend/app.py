from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from routes import api_blueprint
from extensions import db
import config

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)

# Load configuration from config.py
app.config.from_object(config.Config)

# Initialize CORS for the application
CORS(app)

# Initialize the database and JWT manager
db.init_app(app)
jwt = JWTManager(app)

# Set up Flask-Migrate
migrate = Migrate(app, db)

# Register API blueprint
app.register_blueprint(api_blueprint)

# Create all database tables and start the application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This creates tables if they don't exist
    app.run(debug=False, port=5555, host='0.0.0.0')
