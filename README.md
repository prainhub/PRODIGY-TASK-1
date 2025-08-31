User Authentication System
This is a full-stack user authentication system built for a full-stack internship task. The application provides secure user registration and login functionality, protecting a private route that is only accessible after successful authentication.

✨ Features
Secure Registration: New users can sign up with a username and password. The password is securely hashed using bcrypt before being stored.

Secure Login: Users can log in with their credentials. The provided password is compared against the stored hash for verification.

Protected Routes: Access to specific content is restricted to authenticated users only.

Session Management: JSON Web Tokens (JWTs) are used to manage user sessions and maintain the logged-in state across requests.

Role-Based Access Control: The system includes a basic mechanism for user roles (member and admin), allowing for more granular access control on different routes.

Client-Side UI: A simple HTML front-end with JavaScript handles user interactions and communicates with the backend API.

🚀 Getting Started
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js installed on your computer.

Installation
Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

Install backend dependencies:

npm install

This command will install express, bcrypt, jsonwebtoken, and cors, which are listed in the package.json file.

Running the Application
Start the backend server:

npm start

The server will start and run on http://localhost:3000. You will see a confirmation message in your terminal.

Open the front-end:
Open the index.html file in your web browser. You can do this by dragging the file into your browser, or if you are using VS Code, you can use the "Live Server" extension.

Using the App
Use the Register form to create a new user account.

Use the Login form with your new credentials to get an authentication token.

Once logged in, the protected content will become visible.

💻 Technology Stack
Frontend: HTML5, CSS3, JavaScript

Backend: Node.js, Express.js

Authentication: bcrypt for password hashing, jsonwebtoken for JWT-based session management.

Other: cors to handle cross-origin requests.

📁 Project Structure
index.html: The front-end user interface.

server.js: The backend API that handles all server-side logic.

package.json: Manages the project's Node.js dependencies.

Disclaimer: This project uses a simple in-memory database and is intended as a learning tool. For a production environment, it is recommended to use a persistent database like MongoDB, PostgreSQL, or MySQL.
