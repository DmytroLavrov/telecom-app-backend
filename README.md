# Telecom App - Backend ⚙️

Telecom App is the **backend (RESTful API)** for automating the accounting of long-distance phone calls. It handles request processing, subscriber management, city-specific tariffs, call history and the application of discounts.

## 🌟 Live Demo

Check out the live demo of the API here: [**Telecom App - Backend**](https://telecom-app-backend.onrender.com/)

## 📚 API Documentation

Access the full API documentation through Swagger: [**Telecom App - Api Docs**](https://telecom-app-backend.onrender.com/api-docs/)

## 🔥 Functionality

- 👥 **Subscriber Management**: Register, update, and delete legal entity subscribers
- 🏙️ **City Management**: Add, edit, and remove cities with day/night tariffs
- 📞 **Call Recordkeeping**: Automatically register calls with details such as subscriber, city, date, duration and cost
- 🔖 **Flexible Discount System**: Discounts are applied based on the call duration, with each city having its own set of discounts
- 🔑 **Authentication**: Secure login for the admin via JWT tokens

## 🛠 Technologies

- **Runtime Environment**: Node.js
- **Framework**: Express
- **Database**: MongoDB, Mongoose
- **Data Validation**: express-validator
- **Authentication & Security**: JWT (JSON Web Token)
- **API Documentation**: Swagger
- **Deployment Platform**: Render

## 🌐 Main API Endpoints

### Subscribers

- **GET** `/subscribers` – Get a list of all subscribers
- **GET** `/subscribers/{id}` – Get details of a specific subscriber by ID
- **POST** `/subscribers` – Add a new subscriber
- **PUT** `/subscribers/{id}` – Update subscriber data
- **DELETE** `/subscribers/{id}` – Delete a subscriber

### Cities

- **GET** `/cities` – Get a list of all cities
- **POST** `/cities` – Add a new city
- **PUT** `/cities/{id}` – Update city data
- **DELETE** `/cities/{id}` – Delete a city

### Calls

- **GET** `/calls` – Get a list of all calls
- **POST** `/calls` – Add a new call record
- **DELETE** `/calls/{id}` – Delete a call record

### Admin

- **POST** `/auth/login` – Admin Login

## 🔐 Security

A valid JWT token must be provided in the `Authorization` header to access all endpoints, except for `/auth/login`.

## 💡 How to Get Started

### 1. Requirements 📋

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud version, such as MongoDB Atlas)
- **Git** (for cloning the repository)

### 2. Installation 🔧

1. Clone the repository:

   ```sh
   git clone https://github.com/DmytroLavrov/telecom-app-backend.git
   cd telecom-app-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root of the project and add the environment variables:

   ```sh
   PORT=your_desired_port
   MONGO_URL=your_mongodb_connection_string
   SECRET_JWT=your_secret_key
   TELECOM_SERVER_URL=https://your-app-url.com
   ```

4. Start the server:
   ```s
   npm run server
   ```

### 3. API Documentation 📚

After starting the server, the API documentation is available at: `http://localhost:{PORT}/api-docs`, where `{PORT}` is the port you specified in your `.env` file.
