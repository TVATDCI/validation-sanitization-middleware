# Validation and Sanitization Middleware

### Project Purpose
- This project is designed for learning and practicing middleware in a full-stack MERN environment. 
- The focus is on data validation and sanitization to ensure secure and clean data handling between the frontend and backend.

### Features
- Validation Middleware: 
- Ensures user input contains required fields and validates if the user is above 18.
- Sanitization Middleware: 
- Cleans user input, ensuring first and last names are capitalized and numeric fields are properly converted.

### Frontend Integration: 
- A React form to submit user data, display validation messages, and fetch sanitized data.

### Tailwind CSS: 
- Used to style the form for an enhanced user interface.

### Technology Stack
- Backend: Node.js, Express
- Frontend: React, Axios, Tailwind CSS
- Middleware: Custom validation and sanitization middleware

### Other Tools: 
CORS, JSON parsing, and axios for HTTP requests

### How It Works

#### Validation Endpoint (/validateUser):
- Validates user data and returns an appropriate success or error message.

#### Sanitization Endpoint (/sanitizeUser):
- Cleans user data and sends back the sanitized object to the frontend.

#### Setup Instructions
- Clone the repository.
- Navigate to backend and frontend folders to install dependencies using:
- 
- npm install

#### Start the backend:
- npm start

#### Start the frontend:
- npm start

- Submit data through the React form and observe the validation and - sanitization results.

### Learning Objectives
- Understand middleware's role in web applications.
- Implement and chain validation and sanitization logic.
- Integrate backend functionality with a React frontend.
- Style forms with Tailwind CSS for a responsive UI.

#### Have fun! :stuck_out_tongue_winking_eye:

##### mini fetcher set-up
- create a folder
- npm create-react-app .
- npm install axios [https://www.npmjs.com/package/axios] 
