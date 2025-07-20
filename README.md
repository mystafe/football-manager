# Football Manager 0.2.1

Simple browser based manager game with a Node backend.

The application no longer uses Heroku for hosting the API.

## Setup

Install dependencies for backend and client:

```bash
cd backend && npm install
cd ../client && npm install
```

## Running

Start backend and frontend separately:

```bash
cd backend && npm start

In a separate terminal run:
cd client && npm start
```

The frontend reads the backend URL from the `.env` file using `REACT_APP_API_URL`.
