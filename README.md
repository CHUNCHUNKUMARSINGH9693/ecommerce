# 🛒 E-Commerce Admin & Shopping Platform

A full-stack **MERN E-Commerce application** built with React, Node.js, Express.js, and MongoDB. The project provides a complete shopping experience with product management, user authentication, product browsing, and backend APIs.

## 🌐 Live Demo
🔗 [View E-commerce]https://ecommerce-tau-roan.vercel.app/

**Frontend:**
https://ecommerce-tau-roan.vercel.app/

**Backend API:**
https://ecommerce-1-d1j4.onrender.com

**GitHub Repository:**
https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce

---

## 📌 About The Project

This project is a full-stack e-commerce application developed using the **MERN Stack**.

The application is divided into two main parts:

* **Client** – React + Vite frontend application
* **Server** – Node.js + Express.js backend API

The frontend communicates with the backend through REST APIs, while MongoDB is used for persistent data storage.

---

## ✨ Features

### 👤 User Features

* User registration
* User login
* Authentication
* Product browsing
* Product details
* Product search
* Product management
* Responsive user interface

### 🛍️ Product Features

* Create products
* View products
* Update products
* Delete products
* Product information management
* Product images
* Product categories
* Product pricing

### ⚙️ Backend Features

* RESTful API
* Express.js server
* MongoDB database integration
* Mongoose models
* Authentication and authorization
* API controllers and routes
* Middleware
* Product management APIs
* User management APIs

### 🚀 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Database hosted using **MongoDB**

---

## 🏗️ Project Architecture

```text
                    E-Commerce Application
                            │
             ┌──────────────┴──────────────┐
             │                             │
        React Frontend               Express Backend
             │                             │
           Vite                         Node.js
             │                             │
             └──────────────┬──────────────┘
                            │
                         REST API
                            │
                            ▼
                       MongoDB
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* Axios
* React Router
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* JWT Authentication
* bcrypt

### Development Tools

* Git
* GitHub
* VS Code
* npm

### Deployment

* Vercel
* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
ecommerce/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── jobs/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

The repository currently contains separate `client` and `server` directories, with the backend organized into controllers, middleware, models, routes, services, jobs, configuration, and utilities.

---

## 🔐 Environment Variables

### Client

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=https://ecommerce-1-d1j4.onrender.com
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

### Server

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` files, database credentials, JWT secrets, API keys, or other sensitive information to GitHub.

---

## 💻 Installation

### 1. Clone the repository

```bash
git clone https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce.git
```

### 2. Open the project

```bash
cd ecommerce
```

---

## 🚀 Run Frontend

Navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create your `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## ⚙️ Run Backend

Open another terminal:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Configure your MongoDB connection and other environment variables.

Start the backend:

```bash
npm start
```

Or, if the project uses a development script:

```bash
npm run dev
```

---

## 🔄 API Communication

The application follows a client-server architecture:

```text
React/Vite
    │
    │ Axios / HTTP Requests
    ▼
Express.js API
    │
    │ Mongoose
    ▼
MongoDB
```

For production:

```text
Vercel
   │
   ▼
https://ecommerce-1-d1j4.onrender.com
   │
   ▼
MongoDB
```

---

## ☁️ Deployment

### Frontend — Vercel

Build the client:

```bash
cd client
npm install
npm run build
```

Configure the Vercel environment variable:

```env
VITE_API_URL=https://ecommerce-1-d1j4.onrender.com
```

Then deploy the client through Vercel.

### Backend — Render

Configure the Render service with the required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the appropriate Node.js start command from the server's `package.json`.

---

## 🧪 Local Development

Run both applications:

```text
Terminal 1
──────────
cd server
npm install
npm run dev
```

```text
Terminal 2
──────────
cd client
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## 🔒 Security

The project uses environment variables for sensitive configuration.

Do not expose:

* MongoDB credentials
* JWT secrets
* API keys
* Private tokens
* Production credentials

Make sure `.env` files are included in `.gitignore`.

---

## 📈 Future Improvements

* Shopping cart
* Wishlist
* Order management
* Payment gateway integration
* Product reviews and ratings
* Admin dashboard improvements
* Image optimization
* Advanced product filtering
* Email notifications
* Order tracking
* Role-based access control
* Improved production monitoring

---

## 👨‍💻 Author

**Chunchun Kumar Singh**

Full Stack / MERN Developer

### Connect With Me

* GitHub: https://github.com/CHUNCHUNKUMARSINGH9693
* Portfolio: Add your portfolio URL here
* LinkedIn: https://www.linkedin.com/in/chunchun-kumar-singh-a05478282/
---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
