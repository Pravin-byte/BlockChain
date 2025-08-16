// blockchain.js
import crypto from "crypto";
import axios from "axios";

export default class Blockchain {
    constructor() {
        this.currentTransactions = [];
        this.chain = [];
        this.nodes = new Set();

        // Create the genesis block
        this.newBlock(100, "1");
    }

    registerNode(address) {
        try {
            const url = new URL(address);
            this.nodes.add(url.host);
        } catch {
            this.nodes.add(address);
        }
    }

    async validChain(chain) {
        let lastBlock = chain[0];
        let currentIndex = 1;

        while (currentIndex < chain.length) {
            const block = chain[currentIndex];

            // Check hash link
            if (block.previous_hash !== this.hash(lastBlock)) {
                return false;
            }

            // Check PoW
            if (!this.validProof(lastBlock.proof, block.proof, this.hash(lastBlock))) {
                return false;
            }

            lastBlock = block;
            currentIndex++;
        }
        return true;
    }

    async resolveConflicts() {
        const neighbours = Array.from(this.nodes);
        let newChain = null;

        const maxLength = this.chain.length;

        for (const node of neighbours) {
            try {
                const res = await axios.get(`http://${node}/chain`);
                const { length, chain } = res.data;

                if (length > maxLength && await this.validChain(chain)) {
                    newChain = chain;
                }
            } catch (err) {
                console.error(`Could not connect to node ${node}`);
            }
        }

        if (newChain) {
            this.chain = newChain;
            return true;
        }

        return false;
    }

    newBlock(proof, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            proof,
            previous_hash: previousHash || this.hash(this.chain[this.chain.length - 1]),
        };

        block.hash = this.hash(block);


        this.currentTransactions = [];
        this.chain.push(block);
        return block;
    }

    newTransaction(sender, recipient, amount) {
        // Validate transaction data
        if (!sender || !recipient || amount === undefined || amount <= 0) {
            throw new Error("Invalid transaction data");
        }

        const transaction = {
            sender: sender.toString(),
            recipient: recipient.toString(),
            amount: parseFloat(amount),
            timestamp: Date.now()
        };

        this.currentTransactions.push(transaction);
        return this.lastBlock().index + 1;
    }

    lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    hash(block) {
        // Copy block without its `hash` field
        const { hash, ...blockData } = block;
        const blockString = JSON.stringify(blockData, Object.keys(blockData).sort());
        return crypto.createHash("sha256").update(blockString).digest("hex");
    }

    proofOfWork(lastBlock) {
        const lastProof = lastBlock.proof;
        const lastHash = this.hash(lastBlock);

        let proof = 0;
        while (!this.validProof(lastProof, proof, lastHash)) {
            proof++;
        }
        return proof;
    }

    validProof(lastProof, proof, lastHash) {
        const guess = `${lastProof}${proof}${lastHash}`;
        const guessHash = crypto.createHash("sha256").update(guess).digest("hex");
        return guessHash.substring(0, 4) === "0000";
    }

    // Get pending transactions
    getPendingTransactions() {
        return this.currentTransactions;
    }

    // Get blockchain statistics
    getStats() {
        const lastBlock = this.lastBlock();
        return {
            totalBlocks: this.chain.length,
            totalTransactions: this.chain.reduce((total, block) => total + block.transactions.length, 0),
            pendingTransactions: this.currentTransactions.length,
            lastBlockHash: lastBlock ? lastBlock.hash : null,
            lastBlockIndex: lastBlock ? lastBlock.index : null,
            lastBlockProof: lastBlock ? lastBlock.proof : null
        };
    }

    // Validate a specific block
    validateBlock(block) {
        if (block.index === 1) {
            return true; // Genesis block is always valid
        }

        const previousBlock = this.chain[block.index - 2];
        if (!previousBlock) {
            return false;
        }

        // Check previous hash
        if (block.previous_hash !== this.hash(previousBlock)) {
            return false;
        }

        // Check proof of work
        return this.validProof(previousBlock.proof, block.proof, this.hash(previousBlock));
    }
}
