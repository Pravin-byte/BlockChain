// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blockchainRoutes from "./Router/routes.js";

dotenv.config();
const app = express();

// CORS configuration for frontend
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Blockchain server is running" });
});

// Use blockchain routes without /api prefix
app.use("/api", blockchainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        message: `The endpoint ${req.originalUrl} does not exist`
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Blockchain server running on port ${PORT}`);
    console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
    console.log(`🔗 Available endpoints:`);
    console.log(`   GET  /chain - Get full blockchain`);
    console.log(`   POST /transactions/new - Create new transaction`);
    console.log(`   GET  /mine - Mine new block`);
    console.log(`   POST /nodes/register - Register new nodes`);
    console.log(`   GET  /nodes/resolve - Resolve conflicts`);
});
