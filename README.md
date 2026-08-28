https://ecommerce-tau-roan.vercel.app/

# Chunchun Home E-Commerce Suite
Chunchun Home E-Commerce Suite is a premium, full-stack e-commerce solution. It includes a modern web-client interface powered by React & Vite, backed by a robust Node.js / Express server, MongoDB database, and Razorpay integrations.
---
## 🛠️ Technology Stack
- **Frontend:** React (v19), Vite (v8), Tailwind CSS, Lucide React icons.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT authentication, Razorpay SDK, Cron jobs.
- **Hosting / Deployments:** Vercel (Frontend), Render (Backend).
---
## 🚀 Local Quickstart
### 1. Clone the Repository
```bash
git clone https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce.git
cd ecommerce
```
### 2. Install Dependencies
Install all root, client, and server dependencies:
```bash
# Install root package.json dependencies and automatically trigger server install
npm install
# Install client dependencies
npm install --prefix client
```
### 3. Environment Variables Configuration
#### Backend Env (`server/.env`)
Create a file named `.env` in the `server` directory and add the following settings:
```env
PORT=5000
NODE_ENV=development
# Database
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/your_db
# JWT Configuration
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
# Razorpay Configuration (API Keys from dashboard)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
# Allowed CORS client URL
CLIENT_URL=http://localhost:5173
```
