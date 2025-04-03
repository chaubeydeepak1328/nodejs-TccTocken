// walletConnect.js (Node.js version of WalletConnect Provider)
const EthereumProvider = require("@walletconnect/ethereum-provider");

const WALLET_CONNECT_PROJECT_ID = "84514467642e09737867371242627261"; // Get from WalletConnect Cloud
const CHAIN_ID = 1370; // Change as per requirement (1 for Ethereum Mainnet)

const createWalletConnectProvider = async () => {
    try {
        const provider = await EthereumProvider.init({
            projectId: WALLET_CONNECT_PROJECT_ID,
            chains: [CHAIN_ID],
            showQrModal: true, // Show QR code for connecting wallet
            methods: ["eth_sendTransaction", "eth_signTransaction", "personal_sign", "eth_signTypedData"],
            rpcMap: {
                [CHAIN_ID]: "https://blockchain2.ramestta.com", // Replace with Infura or Alchemy
            },
        });

        return provider;
    } catch (error) {
        console.error("WalletConnect Init Error:", error);
        return null;
    }
};

module.exports = { createWalletConnectProvider };
