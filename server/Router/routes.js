// routes.js
import express from "express";
import Blockchain from "../Controller/Blockchain.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const router = express.Router();
const nodeIdentifier = uuidv4().replace(/-/g, "");
const blockchain = new Blockchain();

// Get full blockchain
router.get("/chain", (req, res) => {
    try {
        res.json({
            chain: blockchain.chain,
            length: blockchain.chain.length,
            message: "Blockchain retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve blockchain",
            message: error.message
        });
    }
});

// Get blockchain statistics
router.get("/stats", (req, res) => {
    try {
        const stats = blockchain.getStats();
        res.json({
            ...stats,
            message: "Statistics retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve statistics",
            message: error.message
        });
    }
});

// Get pending transactions
router.get("/transactions/pending", (req, res) => {
    try {
        const pendingTransactions = blockchain.getPendingTransactions();
        res.json({
            transactions: pendingTransactions,
            count: pendingTransactions.length,
            message: "Pending transactions retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve pending transactions",
            message: error.message
        });
    }
});

// Add a new transaction
router.post("/transactions/new", (req, res) => {
    try {
        const { sender, recipient, amount } = req.body;

        if (!sender || !recipient || amount === undefined) {
            return res.status(400).json({
                error: "Missing required fields",
                message: "Sender, recipient, and amount are required"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                error: "Invalid amount",
                message: "Amount must be greater than 0"
            });
        }

        const index = blockchain.newTransaction(sender, recipient, amount);
        res.json({
            message: `Transaction will be added to Block ${index}`,
            transactionIndex: index,
            transaction: {
                sender,
                recipient,
                amount: parseFloat(amount),
                timestamp: Date.now()
            }
        });
    } catch (error) {
        res.status(400).json({
            error: "Failed to create transaction",
            message: error.message
        });
    }
});

// Mine a new block
router.get("/mine", (req, res) => {
    try {
        const lastBlock = blockchain.lastBlock();
        const proof = blockchain.proofOfWork(lastBlock);

        // Reward the miner
        blockchain.newTransaction("0", nodeIdentifier, 1);

        const previousHash = blockchain.hash(lastBlock);
        const block = blockchain.newBlock(proof, previousHash);

        res.json({
            message: "New Block Forged",
            index: block.index,
            transactions: block.transactions,
            proof: block.proof,
            previous_hash: block.previous_hash,
            hash: block.hash,
            timestamp: block.timestamp
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to mine block",
            message: error.message
        });
    }
});

// Mine a new block with user-supplied data and nonce
router.post("/mininig", (req, res) => {
    try {
        const { data, nonce, difficulty } = req.body;

        if (!data || nonce === undefined || !difficulty) {
            return res.status(400).json({
                error: "Missing required fields",
                message: "data, nonce, and difficulty are required"
            });
        }

        const lastBlock = blockchain.lastBlock();
        const previousHash = blockchain.hash(lastBlock);

        // Check if the supplied nonce solves the puzzle
        const lastProof = lastBlock.proof;
        const guess = `${lastProof}${nonce}${previousHash}`;
        const guessHash = crypto.createHash("sha256").update(guess).digest("hex");
        const requiredPrefix = "0".repeat(difficulty);

        if (guessHash.substring(0, difficulty) !== requiredPrefix) {
            return res.json({
                success: false,
                message: "Incorrect nonce, try again",
                hash: guessHash,
            });
        }

        // Reward the miner
        blockchain.newTransaction("0", nodeIdentifier, 1);

        // Create the new block
        const block = blockchain.newBlock(nonce, previousHash);

        res.json({
            success: true,
            message: "Block mined successfully!",
            block,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to mine block",
            message: error.message,
        });
    }
});


// Get a specific block by index
router.get("/block/:index", (req, res) => {
    try {
        const index = parseInt(req.params.index);
        if (isNaN(index) || index < 1 || index > blockchain.chain.length) {
            return res.status(404).json({
                error: "Block not found",
                message: `Block with index ${req.params.index} does not exist`
            });
        }

        const block = blockchain.chain[index - 1];
        res.json({
            block,
            message: "Block retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve block",
            message: error.message
        });
    }
});

// Validate the entire blockchain
router.get("/validate", (req, res) => {
    try {
        let isValid = true;
        const validationResults = [];

        for (let i = 0; i < blockchain.chain.length; i++) {
            const block = blockchain.chain[i];
            const isValidBlock = blockchain.validateBlock(block);

            validationResults.push({
                index: block.index,
                isValid: isValidBlock,
                hash: block.hash
            });

            if (!isValidBlock) {
                isValid = false;
            }
        }

        res.json({
            isValid,
            validationResults,
            message: isValid ? "Blockchain is valid" : "Blockchain validation failed"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to validate blockchain",
            message: error.message
        });
    }
});

// Register new nodes
router.post("/nodes/register", (req, res) => {
    try {
        const { nodes } = req.body;
        if (!nodes || !Array.isArray(nodes)) {
            return res.status(400).json({
                error: "Invalid nodes data",
                message: "Please supply a valid list of nodes"
            });
        }

        nodes.forEach(node => blockchain.registerNode(node));
        res.json({
            message: "New nodes have been added",
            total_nodes: Array.from(blockchain.nodes),
            registered_nodes: nodes
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to register nodes",
            message: error.message
        });
    }
});

// Get registered nodes
router.get("/nodes", (req, res) => {
    try {
        res.json({
            nodes: Array.from(blockchain.nodes),
            count: blockchain.nodes.size,
            message: "Nodes retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve nodes",
            message: error.message
        });
    }
});

// Consensus
router.get("/nodes/resolve", async (req, res) => {
    try {
        const replaced = await blockchain.resolveConflicts();

        if (replaced) {
            res.json({
                message: "Our chain was replaced",
                new_chain: blockchain.chain,
                replaced: true
            });
        } else {
            res.json({
                message: "Our chain is authoritative",
                chain: blockchain.chain,
                replaced: false
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Failed to resolve conflicts",
            message: error.message
        });
    }
});

// Health check for this specific route
router.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Blockchain routes are working",
        nodeId: nodeIdentifier,
        timestamp: Date.now()
    });
});

// Add at the bottom of routes.js (before export default)
router.get("/debug/validate-links", (req, res) => {
    const chain = blockchain.chain;
    const issues = [];

    for (let i = 1; i < chain.length; i++) {
        const expectedHash = blockchain.hash(chain[i - 1]);
        if (chain[i].previous_hash !== expectedHash) {
            issues.push({
                index: i,
                expected: expectedHash,
                found: chain[i].previous_hash
            });
        }
    }

    res.json({
        valid: issues.length === 0,
        issues
    });
});


export default router;
