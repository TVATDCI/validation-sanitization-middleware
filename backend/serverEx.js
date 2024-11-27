/** Base code from the backend/server.js file.
 * I started by creating a simple Express server that listens on port 8000. I added a simple route to test if the server is running.
 * I also added middleware to parse JSON request bodies using express.json().
 * And keep digging into the code,
 *  I added two middleware functions for validation: validateFields and checkAge.
 * The validateFields middleware checks if the required fields (firstName, lastName, age, fbw, and email) are present in the request body.
 * The checkAge middleware checks if the user is above 18 years old. I also added two endpoints: /validateUser and /sanitizeUser.
 * The /validateUser endpoint uses the validateFields and checkAge middleware to validate the user's data.
 * The /sanitizeUser endpoint uses the sanitizeUserData middleware to sanitize the user's data by capitalizing the first and last names and converting the age and fbw to numbers.
 * Finally, I added the /validateUser and /sanitizeUser endpoints to the server.
 * I also added a simple console.log statement to log the received data in the /validateUser endpoint.
 * The code is now ready to be tested using Postman or any other API testing tool.*/
import express from "express";

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple route to test if the server is running
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message:
        "Backend server testing of App Validation & sanitization middleware ",
    });
});

/**
 * Middleware for Validation
 */

// Check required fields
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

// Check if the user is above 18 years old
const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (parseInt(age) < 18) {
    return res.status(400).json({
      message: "We can not validate your user. They are below 18 years of age.",
    });
  }
  next();
};

/**
 * Middleware for Sanitization
 */

// Capitalize first and last names
const capitalizeNames = (req, res, next) => {
  const { firstName, lastName } = req.body;
  req.body.firstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  req.body.lastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  next();
};

// Convert age and fbw to numbers
const convertToNumbers = (req, res, next) => {
  req.body.age = parseInt(req.body.age);
  req.body.fbw = parseInt(req.body.fbw);
  next();
};

/**
 * Endpoints
 */

// Validate User Endpoint
app.post("/validateUser", validateFields, checkAge, (req, res) => {
  res.status(200).json({ message: "This user is valid!" });
});

// Sanitize User Endpoint
app.post("/sanitizeUser", capitalizeNames, convertToNumbers, (req, res) => {
  res.status(200).json(req.body);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/** The aim of having middleware is to separate the concerns of the application before reaching the endpoint.
 * ValidatedFields middleware checks if the required fields are present in the request body.
 * checkAge middleware checks if the user is above 18 years old.
 * Sanitization middleware capitalizes the first and last names and lowercases the rest.
 * convertToNumbers middleware converts the age and fbw to integers (numbers).
 *  /validateUser endpoint is created to validate the user's data.
 * /sanitizeUser endpoint is created to sanitize the user's data and return it to the response
 */

//* How to test the code in postman
/**
 * 1. run the server using node server.js
 * 2. Testing /validateUser endpoint: Open Postman and create a new tab with a POST request to http://localhost:3000/validateUser
 * 3. Add Headers Go to Headers tab and select Content-Type as key
 * 4. Add application/json as value
 * 5. Go to Body tab and select raw and add the following JSON object: the editor field below:
 * in this example, 
 * {
  "firstName": "Steve",
  "lastName": "Stevenson",
  "age": "129",
  "fbw": "36",
  "email": "steve@metallica.com"
}
    * 6. Click on Send
Expected Output:
{
    "message": "This user is valid!"
}
    Testing the user's age below 18:
    * 1. Go to the Body tab and change the age to 17
    * 2. Click on Send
    * Expected Output:
    * {
    "message": "We can not validate your user. They are below 18 years of age."
}

Testing /sanitizeUser endpoint:
* 1. Open Postman and create a new tab with a POST request to http://localhost:3000/sanitizeUser
* 2. Follow the same steps as above to add the headers and body
* 3. Add the following JSON object in the Body tab:
* {
  "firstName": "steve",
  "lastName": "stevenson",
  "age": "129",
  "fbw": "36",
  "email": "
}
* 4. Click on Send
* Expected Output:
{
    "firstName": "Steve",
    "lastName": "Stevenson",
    "age": 129,
    "fbw": 36,
    "email": "
}
    Note on POST routes are NOT GET routes:
    
    * The POST routes are designed to process data sent in the request body, and to send a response back to the client.
    
    * So if you try to access the POST routes in the browser, you will get an error message like "Cannot GET /validateUser" or "Cannot GET /sanitizeUser".
    Or you can hard code the data in the server.js file like:
    app.get("/sanitizeUser", (req, res) => {
  res.send({
    firstName: "Steve",
    lastName: "Stevenson",
    age: 129,
    fbw: 36,
    email: "steve@metallica.com"
  });
});

That why using postman is one of the ways to test the POST routes. Other ways include using tools like curl or writing test cases using testing libraries like Jest.
 */
