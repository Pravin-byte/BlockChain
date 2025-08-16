# Blockchain Demo Project

A full-stack blockchain demonstration project built with React frontend and Node.js backend.

## 🚀 Features

- **Blockchain Implementation**: Complete blockchain with blocks, transactions, and proof-of-work
- **Interactive Frontend**: Modern React UI with real-time blockchain data
- **REST API**: Comprehensive backend API for blockchain operations
- **Real-time Updates**: Live blockchain statistics and block information
- **Proof of Work**: Interactive mining puzzle demonstration
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Project Structure

```
BlockChain/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS styling
│   └── package.json
├── server/                 # Node.js backend
│   ├── Controller/        # Blockchain logic
│   ├── Router/            # API routes
│   └── package.json
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BlockChain
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd server
npm start
# or for development with auto-restart
npm run dev
```

The backend will start on `http://localhost:5000`

### Start the Frontend
```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`


## 🧪 Testing the Backend

Run the test script to verify all endpoints work:

```bash
cd server
node test-server.js
```

## 🎯 Frontend Features

### Landing Page
- Hero section with blockchain visualization
- Feature overview
- Get Started button

### Home Page
- Real-time blockchain statistics
- Transaction creation form
- Block mining functionality
- Recent blocks display

### Puzzle Page
- Proof of Work explanation
- Interactive mining puzzle
- Difficulty adjustment
- Mining tips

### About Page
- Blockchain fundamentals
- How it works
- Real-world applications
- Learning resources

## 🎨 Styling

- **CSS Variables**: Consistent color palette and spacing
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects
- **Modern UI**: Clean, professional design

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
```

### Frontend Configuration
The frontend is configured to connect to `http://localhost:5000` by default.

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port in server/.env or kill the process using the port

2. **CORS Errors**
   - Ensure the backend is running and CORS is properly configured

3. **API Connection Failed**
   - Check if the backend server is running on port 5000
   - Verify the frontend is making requests to the correct URL



## 🙏 Acknowledgments

- Built with React, Node.js, and Express
- Inspired by blockchain technology
- Educational purpose demonstration

---

