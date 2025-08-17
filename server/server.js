// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blockchainRoutes from "./Router/routes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ],
    credentials: true
}));

app.use(express.json());

// API routes
app.use("/api", blockchainRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Blockchain server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Blockchain server running on port ${PORT}`);
});
