# API - Container Directory Backend

FastAPI backend service for the Container Directory application.

## 🎯 Features

- RESTful API with FastAPI
- MongoDB integration
- CORS enabled
- Async/await support
- Pydantic models for validation
- Automatic API documentation

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- MongoDB

### Installation

```bash
# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Create a `.env` file:

```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=container_directory
CORS_ORIGINS=http://localhost:3000
```

### Development

```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

API will be available at: http://localhost:8001

## 📚 API Documentation

### Automatic Documentation

- **Swagger UI**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

### Endpoints

#### Health Check
```
GET /api/
Response: { "message": "Hello World" }
```

#### Status Checks
```
POST /api/status
Body: { "client_name": "string" }
Response: StatusCheck object

GET /api/status
Response: List of StatusCheck objects
```

## 📁 Project Structure

```
api/
├── server.py           # Main FastAPI application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (git ignored)
└── README.md          # This file
```

## 🔧 Tech Stack

- **Framework**: FastAPI
- **Database**: MongoDB (Motor async driver)
- **Validation**: Pydantic
- **Environment**: python-dotenv

## 📦 Dependencies

```
fastapi
motor (MongoDB async driver)
pydantic
python-dotenv
uvicorn
```

## 🛠️ API Routes

All routes are prefixed with `/api` to match the Kubernetes ingress configuration.

Example:
- Local: `http://localhost:8001/api/status`
- Production: `https://your-domain.com/api/status`

## 🔗 Related

- [Web App](../web/README.md)
- [Project Root](../../README.md)
