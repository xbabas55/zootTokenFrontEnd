// ZOOT Token Smart Contract
const { 
    Connection, 
    PublicKey, 
    Transaction, 
    SystemProgram, 
    LAMPORTS_PER_SOL,
    TransactionInstruction
} = solanaWeb3;

// Contract Configuration
const CONTRACT_CONFIG = {
    // The mint authority is the public key from your zoot-authority.json file
    // Get it by running: solana address -k ~/zoot-authority.json
    // IMPORTANT: Keep the private key (zoot-authority.json) secure and never share it!
    ZOOT_MINT_AUTHORITY: new PublicKey('YOUR_MINT_AUTHORITY_ADDRESS'), 

    // This is your presale wallet that will receive the SOL from token sales
    // Should be a different wallet from your mint authority for security
    PRESALE_WALLET: new PublicKey('YOUR_PRESALE_WALLET_ADDRESS'),     

    // Standard SPL token configuration
    TOKEN_DECIMALS: 9,
    TOKEN_PROGRAM_ID: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
};

class ZootContract {
    constructor() {
        this.connection = null;
        this.presaleActive = true;
    }

    // Initialize connection to Solana network
    async initialize(network = 'devnet') {
        try {
            const endpoint = network === 'mainnet' 
                ? 'https://api.mainnet-beta.solana.com' 
                : 'https://api.devnet.solana.com';
            
            this.connection = new Connection(endpoint, 'confirmed');
            console.log('Connected to Solana', network);
            return true;
        } catch (error) {
            console.error('Failed to connect to Solana network:', error);
            return false;
        }
    }

    // Validate transaction parameters
    validatePurchase(amount) {
        if (!this.presaleActive) {
            throw new Error('Presale is not active');
        }
        if (amount < 0.1) {
            throw new Error('Minimum purchase amount is 0.1 SOL');
        }
        if (amount > 50) {
            throw new Error('Maximum purchase amount is 50 SOL');
        }
    }

    // Calculate token amount based on SOL amount
    calculateTokenAmount(solAmount) {
        const stage1Rate = 1000000; // 1 SOL = 1,000,000 ZOOT
        return solAmount * stage1Rate * (10 ** CONTRACT_CONFIG.TOKEN_DECIMALS);
    }

    // Create and send presale purchase transaction
    async createPurchaseTransaction(buyerPublicKey, solAmount) {
        try {
            this.validatePurchase(solAmount);

            const transaction = new Transaction();
            
            // Add SOL transfer instruction
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: buyerPublicKey,
                    toPubkey: CONTRACT_CONFIG.PRESALE_WALLET,
                    lamports: solAmount * LAMPORTS_PER_SOL
                })
            );

            // Add memo instruction for tracking
            const memoInstruction = new TransactionInstruction({
                keys: [],
                programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
                data: Buffer.from('ZOOT Presale Purchase', 'utf-8')
            });
            transaction.add(memoInstruction);

            // Get recent blockhash
            const { blockhash } = await this.connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = buyerPublicKey;

            return transaction;

        } catch (error) {
            console.error('Failed to create purchase transaction:', error);
            throw error;
        }
    }

    // Verify transaction success
    async verifyTransaction(signature) {
        try {
            const confirmation = await this.connection.confirmTransaction(signature);
            if (confirmation.value.err) {
                throw new Error('Transaction failed');
            }
            return true;
        } catch (error) {
            console.error('Transaction verification failed:', error);
            throw error;
        }
    }

    // Get buyer's ZOOT token balance
    async getTokenBalance(walletAddress) {
        try {
            const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
                new PublicKey(walletAddress),
                { programId: CONTRACT_CONFIG.TOKEN_PROGRAM_ID }
            );

            const zootAccount = tokenAccounts.value.find(account => 
                account.account.data.parsed.info.mint === CONTRACT_CONFIG.ZOOT_MINT_AUTHORITY.toBase58()
            );

            return zootAccount ? zootAccount.account.data.parsed.info.tokenAmount.uiAmount : 0;
        } catch (error) {
            console.error('Failed to get token balance:', error);
            return 0;
        }
    }

    // Check if wallet has sufficient SOL balance
    async checkSufficientBalance(walletAddress, amount) {
        try {
            const balance = await this.connection.getBalance(new PublicKey(walletAddress));
            return balance >= (amount * LAMPORTS_PER_SOL);
        } catch (error) {
            console.error('Failed to check balance:', error);
            return false;
        }
    }
}

// Export contract instance
const zootContract = new ZootContract();
