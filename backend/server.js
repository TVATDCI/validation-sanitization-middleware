import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS to allow frontend requests
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend server is running for real!" });
});

// Middleware for validation
const validateFields = (req, res, next) => {
  const { firstName, lastName, age, fbw, email } = req.body;
  if (!firstName || !lastName || !age || !fbw || !email) {
    return res.status(400).json({
      message:
        "Missing required fields: firstName, lastName, age, fbw, or email.",
    });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (parseInt(age) < 18) {
    return res.status(400).json({
      message: "We can not validate your user. They are below 18 years of age.",
    });
  }
  next();
};

// Routes
app.post("/validateUser", validateFields, checkAge, (req, res) => {
  console.log("Received data", req.body);
  res.status(200).json({ message: "This user is valid!" });
});

// Middleware for sanitization
const sanitizeUserData = (req, res, next) => {
  const { firstName, lastName, age, fbw } = req.body;

  req.body.firstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : firstName;

  req.body.lastName = lastName
    ? lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
    : lastName;

  req.body.age = age ? parseInt(age) : age;
  req.body.fbw = fbw ? parseInt(fbw) : fbw;

  next();
};

// New endpoint with sanitization
app.post("/sanitizeUser", validateFields, sanitizeUserData, (req, res) => {
  res.status(200).json({
    message: "Sanitization successful!",
    sanitizedData: req.body,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
