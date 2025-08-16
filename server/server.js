// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import blockchainRoutes from "./Router/routes.js";

dotenv.config();
const app = express();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration for frontend (can adjust if using same domain in production)
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true
}));

app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", blockchainRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Blockchain server is running" });
});

// Catch-all: serve React app for frontend routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
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
