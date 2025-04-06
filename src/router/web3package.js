const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
const path = require("path");

// ✅ preferred unless you're using ESM

const fs = require('fs');

const INFURA_URL = "https://sepolia.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
// Connect to Ethereum network  process.env.INFURA_URL
const web3 = new Web3(INFURA_URL);


// Load contract ABI
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, "../Contract/contractABI.json"), "utf8"));

// Contract instance   process.env.CONTRACT_ADDRESS
const contract = new web3.eth.Contract(abi, "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9");

router.get("/wallet_data", async (req, res) => {
    try {

        // make the call to the contract
        const totalSupply = await contract.methods.TOTAL_SUPPLY().call();

        // make the call to the contract
        const totalSold = await contract.methods.totalSold().call();

        // make the call to the contract
        const user = await contract.methods.users("0xc0358Bcd0F329644A9A034f9F2C4a4838ae819A5").call();

        // make the call to the contract
        const getdirectReferal = await contract.methods.getDirectReferrals("0xc0358Bcd0F329644A9A034f9F2C4a4838ae819A5").call();

        // total remaining = total supply - total sold
        const totalRemaining = totalSupply - totalSold;

        // make the call to the contract
        const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();

        // const WalletBalance = await web3.eth.getBalance('0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9');

        console.log("user", user);


        res.send({
            data: {
                "totalSupply": totalSupply.toString(),
                "totalSold": totalSold.toString(),
                "totalRemaining": totalRemaining.toString(),
                "referalAllocation": referalAllocation.toString(),
                // "WalletBalance": web3.utils.fromWei(WalletBalance, 'ether').toString(),
                "user": user.toString(),
                "getdirectReferal": getdirectReferal.toString(),
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data from blockchain.");
    }
});



router.post("/user_details", async (req, res) => {
    try {

        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).send({ error: "walletAddress is required" });
        }

        // make the call to the contract
        const user = await contract.methods.users(walletAddress).call();

        const totalSold = await contract.methods.totalSold().call();

        const directReferal = await contract.methods.getDirectReferrals(walletAddress).call();


        console.log("user", user);


        res.send({
            data: {
                "referrer": user.referrer,
                "tier1Rewards": user.tier1Rewards.toString(),
                "tier2Rewards": user.tier2Rewards.toString(),
                "totalBoughtTokens": user.totalBoughtTokens.toString(),
                "totalSold": totalSold.toString(),
                "getDirectReferralsCount": directReferal.toString().split(",").length,

            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data from blockchain.");
    }
});






async function getReceipt(txHash) {
    try {
        const tx = await web3.eth.getTransaction(txHash);
        const receipt = await web3.eth.getTransactionReceipt(txHash);

        //         const tx = await web3.eth.getTransaction(txHash);
        // const receipt = await web3.eth.getTransactionReceipt(txHash);

        if (tx && receipt) {
            const sender = tx.from;
            const recipientContract = tx.to;
            const inputData = tx.input;

            console.log("Sender:", sender);
            console.log("Recipient Contract:", recipientContract);
            console.log("Input Data:", inputData);

            const methodSignature = inputData.slice(0, 10);
            const expectedSignature = web3.eth.abi.encodeFunctionSignature("buyTokens(address)");

            if (methodSignature === expectedSignature) {
                const params = web3.eth.abi.decodeParameters(['address'], inputData.slice(10));
                const referrer = params[0];

                console.log("buyTokens called with referrer:", referrer);

                // 🔍 Look for Transfer events in logs
                const transferTopic = web3.utils.sha3("Transfer(address,address,uint256)");

                receipt.logs.forEach(log => {
                    if (log.topics[0] === transferTopic) {
                        const from = '0x' + log.topics[1].slice(26); // remove leading zeros
                        const to = '0x' + log.topics[2].slice(26);
                        const value = web3.utils.toBN(log.data).toString();

                        console.log(`Token Transfer => From: ${from} | To: ${to} | Amount: ${web3.utils.fromWei(value)} tokens`);
                    }
                });
            } else {
                console.log("Method does not match buyTokens(address)");
            }
        }


        // const tx = await web3.eth.getTransaction(txHash);
        // const receipt = await web3.eth.getTransactionReceipt(txHash);

        // if (tx && receipt) {
        //     const sender = tx.from;
        //     const recipientContract = tx.to;
        //     const inputData = tx.input;

        //     console.log("Sender:", sender);
        //     console.log("Recipient Contract:", recipientContract);
        //     console.log("Input Data:", inputData);

        //     const methodSignature = inputData.slice(0, 10); // first 4 bytes = 8 hex chars + '0x'

        //     const expectedSignature = web3.eth.abi.encodeFunctionSignature("buyTokens(address)");

        //     if (methodSignature === expectedSignature) {
        //         const params = web3.eth.abi.decodeParameters(
        //             ['address'],       // parameter types
        //             inputData.slice(10) // remove the method signature part
        //         );

        //         const referrer = params[0];
        //         console.log("buyTokens called with referrer:", referrer);
        //     } else {
        //         console.log("Method does not match buyTokens(address)");
        //     }
        // }


        // if (tx && receipt) {
        //     const sender = tx.from;
        //     const recipientContract = tx.to;
        //     const inputData = tx.input;

        //     console.log("Sender:", sender);
        //     console.log("Recipient Contract:", recipientContract);
        //     console.log("Input Data:", inputData);

        //     const methodSignature = inputData.slice(0, 10); // first 4 bytes = 8 chars + '0x'

        //     const { function_name, function_params } = contract.decode_function_input(inputData)

        //     println("Method Signature:", function_name, function_params);

        //     if (methodSignature === transferSignature) {
        //         const params = web3.eth.abi.decodeParameters(
        //             ['address'],
        //             inputData.slice(10)
        //         );

        //         const recipient = params[0];
        //         const amount = web3.utils.fromWei(params[1], 'mwei'); // USDT uses 6 decimals

        //         if (parseFloat(amount) <= 0) {
        //             console.log({ success: false, error: 'Invalid amount' });
        //             return;
        //         }

        //         console.log(`USDT Transferred: ${amount} to ${recipient}`);
        //         console.log("Transaction Receipt:", receipt);
        //     } else {
        //         console.log("Function is not transfer()");
        //     }
        // } else {
        //     console.log("Transaction not yet mined. Please wait...");
        // }
    } catch (error) {
        console.error("Error fetching receipt:", error.message);
    }
}




// Private key and address
const privateKey = "0x854b019e31fe5521e88bd591361153ff402d95609746ee305f5ac8c65591eeef"; // Add 0x prefix
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const senderAddress = account.address;


router.get("/wallet_transfer", async (req, res) => {
    try {

        const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";

        const valueInWei = web3.utils.toWei('0.001', 'ether');

        const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
            from: senderAddress,
            value: valueInWei
        });

        console.log("Estimated gas:", estimatedGas);



        const gasPrice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

        const tx = {
            from: senderAddress,
            to: "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63",
            value: valueInWei,
            gas: estimatedGas,
            gasPrice: gasPrice,
            nonce: nonce,
            data: contract.methods.buyTokens(referrerAddress).encodeABI()
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Transaction successful with hash: ${receipt.transactionHash}`);

        console.log("Transaction Receipt:", getReceipt(receipt.transactionHash));

        // res.send({ message: `Transaction successful with hash: ${receipt.transactionHash}` });
    } catch (error) {
        // console.error("Error sending transaction:");
        // console.log(` error code is ${error.code} and type is ${typeof error.code}`);
        // console.log(` error data is ${error.cause.data} and type is ${typeof error.cause.data}`);


        if (error.code == 3 || error.cause.data) {

            // console.error("Transaction reverted. Decoding revert reason...");

            // Decode revert reason from returned data
            const errorData = error.cause.data;

            const reasonHex = errorData.slice(10);

            const reason = web3.utils.hexToUtf8('0x' + reasonHex);

            console.error("Revert Reason:", reason);
        } else {
            console.error("Error sending transaction:", error.message || error);
        }
    }



});




module.exports = router;