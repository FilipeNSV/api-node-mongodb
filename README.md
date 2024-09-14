# Back-End of the Users Control Application

This is the repository of the back-end of the Users Control application, developed in Node.js. This back-end is designed exclusively to handle API routes, offering simple and efficient route management, with excellent performance. The routes also have authentication for better application security. It connects to the MongoDB database and follows the MVC standard, maintaining a clean and organized code.

## Technologies Used

The Users Control Application was developed using the following technologies, frameworks and libraries:

- **Node.js:**
- **MongoDB:**

In addition to the technologies mentioned above, the MVC standard was used to maintain an organized and easy-to-maintain code.

## Functionalities

The back-end is responsible for connecting to the database and processing the information from the requests, providing the front-end with all the necessary functionalities and data processing.

### Users CRUD

- **Users List:** View all registered users, including details.
- **Users Registration:** Add new users with information such as name, email, password and age.
- **Users Editing:** Update the information of an existing user.
- **Users Deletion:** Delete a specific user.

### API Routes

The following are the API routes and their respective controllers:

#### Routes (With authentication)

- **GET /api/users:** Returns the list of users. Controller: `UserController.getAll`.
- **GET /api/users/:id:** Returns details of a specific user. Controller: `UserController.getById`.
- **PUT /api/users/:id:** Update a specific user. Controller: `UserController.update`.
- **DELETE /api/users/:id:** Delete a specific user. Controller: `UserController.delete`.

#### Routes (No Authentication)
- **POST /api/users:** Registers a new user. Controller: `UserController.create`.
- **POST /api/login:** Authenticates the user. Controller: `AuthController.login`.

## Execution

To run the application, follow the steps below:

1. **Clone this repository:**
   ```sh
   git clone https://github.com/FilipeNSV/api-node-mongodb.git

2. **Navigate to the project directory:**
   ```sh
   cd your-repository

3. **Run npm install:**
   ```sh
   npm install

4. **Configure the .env file with the database information and make a JWT_KEY:** 
   Example:
   ```sh
   PORT=3000
   MONGODB_URI='mongodb://localhost:27017/db_nodemongo'
 
   JWT_KEY=DFVXAszn7V8KxvFUdsdass61Vyj8To55AXpDE1yDjpsPIpJcjcdsadas3h0skxARpzq

5. **Run the local npm run dev on the desired port:**
   ```sh
   npm run dev