const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
const path = require("path");

// ✅ preferred unless you're using ESM

const fs = require('fs');

// const INFURA_URL = "https://sepolia.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
// const INFURA_URL = "https://bsc-testnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
const INFURA_URL = "https://bsc-mainnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"

// Connect to Ethereum network  process.env.INFURA_URL
const web3 = new Web3(INFURA_URL);


// Load contract ABI
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, "../Contract/contractABI.json"), "utf8"));

// Contract instance   process.env.CONTRACT_ADDRESS
// const contract = new web3.eth.Contract(abi, "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9");
const contract = new web3.eth.Contract(abi, "0xAd771bac597eFac136929195985577Da0C40e557");


// router.get("/wallet_data", async (req, res) => {
//     try {

//         // make the call to the contract
//         const totalSupply = await contract.methods.TOTAL_SUPPLY().call();

//         // make the call to the contract
//         const totalSold = await contract.methods.totalSold().call();

//         // make the call to the contract
//         const user = await contract.methods.users("0xc0358Bcd0F329644A9A034f9F2C4a4838ae819A5").call();

//         // make the call to the contract
//         const getdirectReferal = await contract.methods.getDirectReferrals("0xc0358Bcd0F329644A9A034f9F2C4a4838ae819A5").call();

//         // total remaining = total supply - total sold
//         const totalRemaining = totalSupply - totalSold;

//         // make the call to the contract
//         const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();

//         // const WalletBalance = await web3.eth.getBalance('0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9');

//         console.log("user", user);


//         res.send({
//             data: {
//                 "totalSupply": totalSupply.toString(),
//                 "totalSold": totalSold.toString(),
//                 "totalRemaining": totalRemaining.toString(),
//                 "referalAllocation": referalAllocation.toString(),
//                 // "WalletBalance": web3.utils.fromWei(WalletBalance, 'ether').toString(),
//                 "user": user.toString(),
//                 "getdirectReferal": getdirectReferal.toString(),
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).send("Error fetching data from blockchain.");
//     }
// });



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


        const cleanReferrals = directReferal.filter(
            (ref) => ref && ref !== "0x0000000000000000000000000000000000000000"
        );

        console.log(`Cleaned Direct Referrals:`, cleanReferrals.length);

        // console.log(`directReferal------------------>`, directReferal.length)


        console.log("user", user);


        res.send({
            data: {
                "referrer": user.referrer,
                "tier1Rewards": user.tier1Rewards.toString(),
                "tier2Rewards": user.tier2Rewards.toString(),
                "totalBoughtTokens": user.totalBoughtTokens.toString(),
                "totalSold": totalSold.toString(),
                // "getDirectReferralsCount": directReferal.toString().split(",").length,
                "getDirectReferralsCount": directReferal.length,


            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data from blockchain.");
    }
});






// async function getReceipt(txHash) {
//     try {
//         const tx = await web3.eth.getTransaction(txHash);
//         const receipt = await web3.eth.getTransactionReceipt(txHash);

//         //         const tx = await web3.eth.getTransaction(txHash);
//         // const receipt = await web3.eth.getTransactionReceipt(txHash);

//         if (tx && receipt) {
//             const sender = tx.from;
//             const recipientContract = tx.to;
//             const inputData = tx.input;

//             console.log("Sender:", sender);
//             console.log("Recipient Contract:", recipientContract);
//             console.log("Input Data:", inputData);

//             const methodSignature = inputData.slice(0, 10);
//             const expectedSignature = web3.eth.abi.encodeFunctionSignature("buyTokens(address)");

//             if (methodSignature === expectedSignature) {
//                 const params = web3.eth.abi.decodeParameters(['address'], inputData.slice(10));
//                 const referrer = params[0];

//                 console.log("buyTokens called with referrer:", referrer);

//                 // 🔍 Look for Transfer events in logs
//                 const transferTopic = web3.utils.sha3("Transfer(address,address,uint256)");

//                 receipt.logs.forEach(log => {
//                     if (log.topics[0] === transferTopic) {
//                         const from = '0x' + log.topics[1].slice(26); // remove leading zeros
//                         const to = '0x' + log.topics[2].slice(26);
//                         const value = web3.utils.toBN(log.data).toString();

//                         console.log(`Token Transfer => From: ${from} | To: ${to} | Amount: ${web3.utils.fromWei(value)} tokens`);
//                     }
//                 });
//             } else {
//                 console.log("Method does not match buyTokens(address)");
//             }
//         }


//         // const tx = await web3.eth.getTransaction(txHash);
//         // const receipt = await web3.eth.getTransactionReceipt(txHash);

//         // if (tx && receipt) {
//         //     const sender = tx.from;
//         //     const recipientContract = tx.to;
//         //     const inputData = tx.input;

//         //     console.log("Sender:", sender);
//         //     console.log("Recipient Contract:", recipientContract);
//         //     console.log("Input Data:", inputData);

//         //     const methodSignature = inputData.slice(0, 10); // first 4 bytes = 8 hex chars + '0x'

//         //     const expectedSignature = web3.eth.abi.encodeFunctionSignature("buyTokens(address)");

//         //     if (methodSignature === expectedSignature) {
//         //         const params = web3.eth.abi.decodeParameters(
//         //             ['address'],       // parameter types
//         //             inputData.slice(10) // remove the method signature part
//         //         );

//         //         const referrer = params[0];
//         //         console.log("buyTokens called with referrer:", referrer);
//         //     } else {
//         //         console.log("Method does not match buyTokens(address)");
//         //     }
//         // }


//         // if (tx && receipt) {
//         //     const sender = tx.from;
//         //     const recipientContract = tx.to;
//         //     const inputData = tx.input;

//         //     console.log("Sender:", sender);
//         //     console.log("Recipient Contract:", recipientContract);
//         //     console.log("Input Data:", inputData);

//         //     const methodSignature = inputData.slice(0, 10); // first 4 bytes = 8 chars + '0x'

//         //     const { function_name, function_params } = contract.decode_function_input(inputData)

//         //     println("Method Signature:", function_name, function_params);

//         //     if (methodSignature === transferSignature) {
//         //         const params = web3.eth.abi.decodeParameters(
//         //             ['address'],
//         //             inputData.slice(10)
//         //         );

//         //         const recipient = params[0];
//         //         const amount = web3.utils.fromWei(params[1], 'mwei'); // USDT uses 6 decimals

//         //         if (parseFloat(amount) <= 0) {
//         //             console.log({ success: false, error: 'Invalid amount' });
//         //             return;
//         //         }

//         //         console.log(`USDT Transferred: ${amount} to ${recipient}`);
//         //         console.log("Transaction Receipt:", receipt);
//         //     } else {
//         //         console.log("Function is not transfer()");
//         //     }
//         // } else {
//         //     console.log("Transaction not yet mined. Please wait...");
//         // }
//     } catch (error) {
//         console.error("Error fetching receipt:", error.message);
//     }
// }




// Private key and address
// const privateKey = "0x854b019e31fe5521e88bd591361153ff402d95609746ee305f5ac8c65591eeef"; // Add 0x prefix
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// const senderAddress = account.address;


// router.get("/wallet_transfer", async (req, res) => {
//     try {

//         const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";

//         const valueInWei = web3.utils.toWei('0.001', 'ether');

//         const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
//             from: senderAddress,
//             value: valueInWei
//         });

//         console.log("Estimated gas:", estimatedGas);



//         const gasPrice = await web3.eth.getGasPrice();
//         const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

//         const tx = {
//             from: senderAddress,
//             to: "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63",
//             value: valueInWei,
//             gas: estimatedGas,
//             gasPrice: gasPrice,
//             nonce: nonce,
//             data: contract.methods.buyTokens(referrerAddress).encodeABI()
//         };

//         // Sign the transaction
//         const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

//         // Send the transaction
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log(`Transaction successful with hash: ${receipt.transactionHash}`);

//         console.log("Transaction Receipt:", getReceipt(receipt.transactionHash));

//         // res.send({ message: `Transaction successful with hash: ${receipt.transactionHash}` });
//     } catch (error) {
//         // console.error("Error sending transaction:");
//         // console.log(` error code is ${error.code} and type is ${typeof error.code}`);
//         // console.log(` error data is ${error.cause.data} and type is ${typeof error.cause.data}`);


//         if (error.code == 3 || error.cause.data) {

//             // console.error("Transaction reverted. Decoding revert reason...");

//             // Decode revert reason from returned data
//             const errorData = error.cause.data;

//             const reasonHex = errorData.slice(10);

//             const reason = web3.utils.hexToUtf8('0x' + reasonHex);

//             console.error("Revert Reason:", reason);
//         } else {
//             console.error("Error sending transaction:", error.message || error);
//         }
//     }



// });





// router.post("/all-transaction", async (req, res) => {
//     const { walletAddress } = req.body;
//     // const etherscanApiKey = 'JRA6JIVJQCK333XNWDZTFV7A7SFSYKB9XD';
//     // const contractAddress = "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9";
//     const contractAddress = "0x4378067372859734CbcB3b1000944e90cfb7A41d";

//     // const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`;

//     const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`;

//     try {
//         if (!walletAddress) {
//             return res.status(400).json({ message: "Wallet address is required" });
//         }

//         const response = await fetch(url);
//         const result = await response.json();

//         if (result.status !== "1" || !Array.isArray(result.result)) {
//             return res.status(500).json({ message: "Failed to fetch transactions from Etherscan" });
//         }

//         const txs = result.result;

//         // Optional: remove the filter temporarily to test
//         const contractTxs = txs.filter(tx => tx.to?.toLowerCase() === contractAddress.toLowerCase());

//         // Add readableTime and ETH conversion on server side
//         const formattedTxs = contractTxs.map(tx => ({
//             ...tx,
//             readableTime: new Date(tx.timeStamp * 1000).toLocaleString(),
//             value: (Number(tx.value) / 1e18).toFixed(5) // convert Wei to ETH
//         }));

//         res.status(200).json({ data: formattedTxs });

//     } catch (err) {
//         console.error("Server error while fetching transactions:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// router.post("/direct-earning", async (req, res) => {
//     const { walletAddress } = req.body;

//     if (!walletAddress) {
//         return res.status(400).json({ message: "Wallet address is required" });
//     }

//     try {
//         const directReferrals = await contract.methods.getDirectReferrals(walletAddress).call();
//         console.log("Backend Direct Referrals:", directReferrals);

//         const referralData = await Promise.all(
//             directReferrals.map(async (refAddress) => {
//                 try {
//                     // Fetch user data for each direct referral
//                     const user = await contract.methods.users(refAddress).call();

//                     const referrer = user.referrer || "N/A";
//                     const tier1 = (parseFloat(user.tier1Rewards) / 1e18).toFixed(5);
//                     const tier2 = (parseFloat(user.tier2Rewards) / 1e18).toFixed(5);
//                     const totalTokenPurchased = (parseFloat(user.totalBoughtTokens) / 1e18).toFixed(5);
//                     const reward = ((parseFloat(totalTokenPurchased) * 8) / 100).toFixed(5);

//                     return {
//                         walletAddress: refAddress,
//                         referrer,
//                         totalTokenPurchased,
//                         reward,
//                     };
//                 } catch (error) {
//                     console.error("Error fetching referral details for:", refAddress, error);
//                     return {
//                         walletAddress: refAddress,
//                         referrer: "Error",
//                         totalTokenPurchased: "0",
//                         reward: "0",
//                     };
//                 }
//             })
//         );

//         res.status(200).json({ data: referralData });

//     } catch (error) {
//         console.error("Error in /direct-earning:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// router.post("/level-earning", async (req, res) => {
//     const { walletAddress } = req.body;

//     if (!walletAddress) {
//         return res.status(400).json({ message: "Wallet address is required" });
//     }

//     try {
//         const directReferrals = await contract.methods.getUpline(walletAddress, 2).call();
//         console.log("Backend Direct Referrals:", directReferrals);

//         const referralData = await Promise.all(
//             directReferrals.map(async (refAddress) => {
//                 try {
//                     // Fetch user data for each direct referral
//                     const user = await contract.methods.users(refAddress).call();

//                     const referrer = user.referrer || "N/A";
//                     const tier1 = (parseFloat(user.tier1Rewards) / 1e18).toFixed(5);
//                     const tier2 = (parseFloat(user.tier2Rewards) / 1e18).toFixed(5);
//                     const totalTokenPurchased = (parseFloat(user.totalBoughtTokens) / 1e18).toFixed(5);
//                     const reward = ((parseFloat(totalTokenPurchased) * 8) / 100).toFixed(5);

//                     return {
//                         walletAddress: refAddress,
//                         referrer,
//                         totalTokenPurchased,
//                         reward,
//                     };
//                 } catch (error) {
//                     console.error("Error fetching referral details for:", refAddress, error);
//                     return {
//                         walletAddress: refAddress,
//                         referrer: "Error",
//                         totalTokenPurchased: "0",
//                         reward: "0",
//                     };
//                 }
//             })
//         );

//         res.status(200).json({ data: referralData });

//     } catch (error) {
//         console.error("Error in /direct-earning:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// router.post("/purchased-token", async (req, res) => {
//     try {

//         const { walletAddress } = req.body
//         // TokensPurchased
//         const events = await contract.getPastEvents("TokensPurchased", {
//             filter: { buyer: walletAddress },
//             fromBlock: 0,
//             toBlock: "latest",
//         });

//         events.forEach(event => {
//             console.log("Raw Topics:", event.topics);

//             // If you want to decode topics manually (e.g., string from bytes32)
//             event.topics.forEach((topic, index) => {
//                 try {
//                     const utf8 = web3.utils.hexToUtf8(topic);
//                     console.log(`Topic[${index}] UTF-8:`, utf8);
//                 } catch (e) {
//                     console.log(`Topic[${index}] not UTF-8 decodable`, topic);
//                 }
//             });

//             // You can also decode event.data if it includes encoded string/bytes
//             try {
//                 const utf8Data = web3.utils.hexToUtf8(event.data);
//                 console.log("Event Data UTF-8:", utf8Data);
//             } catch (e) {
//                 console.log("Event data not UTF-8 decodable", event.data);
//             }
//         });

//         // events.forEach(element => {
//         //     console.log(element.topics)

//         // });

//         // console.log("TokensPurchased events:", events);

//         // // IntroducerRewarded
//         // const introEvents = await contract.getPastEvents("IntroducerRewarded", {
//         //     filter: { introducer: walletAddress },
//         //     fromBlock: 0,
//         //     toBlock: "latest",
//         // });

//         // console.log("IntroducerRewarded events:", introEvents);

//         // // SecondUplilneRewarded
//         // const secondLineEvents = await contract.getPastEvents("SecondUplilneRewarded", {
//         //     filter: { introducer: walletAddress },
//         //     fromBlock: 0,
//         //     toBlock: "latest",
//         // });

//         // console.log("SecondUplilneRewarded events:", secondLineEvents);

//         res.send({
//             "TokensPurchased": events,
//             // "IntroducerRewarded": IntroducerRewarded,
//             // "SecondUplilneRewarded": secondLineEvents
//         })




//     } catch (error) {
//         console.error("Error fetching events:", error);
//     }
// });



router.post("/level-earning", async (req, res) => {
    try {
        const { walletAddress } = req.body;

        const uplineEvents = await contract.getPastEvents("SecondUplilneRewarded", {
            filter: { introducer: walletAddress },
            fromBlock: 0,
            toBlock: "latest",
        });

        const decodedUplines = uplineEvents.map(event => {
            const decoded = web3.eth.abi.decodeLog(
                [
                    { type: 'uint256', name: 'amount' }
                ],
                event.data,
                event.topics.slice(1)
            );

            return {
                secondUpline: '0x' + event.topics[1].slice(26),
                amount: decoded.amount.toString() / 10 ** 18, // Convert BigInt to string
                blockNumber: event.blockNumber,
                transactionHash: event.transactionHash,
                type: "Level Income"
            };
        });

        const convertBigIntsToStrings = (data) => {
            return JSON.parse(JSON.stringify(data, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        };



        res.status(200).json(convertBigIntsToStrings(decodedUplines));


    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ error: "Failed to fetch events." });
    }
});



router.post("/direct-earning", async (req, res) => {
    try {
        const { walletAddress } = req.body;


        const introducerEvents = await contract.getPastEvents("IntroducerRewarded", {
            filter: { introducer: walletAddress },
            fromBlock: 0,
            toBlock: "latest",
        });

        const decodedIntroducers = introducerEvents.map(event => {
            const decoded = web3.eth.abi.decodeLog(
                [
                    { type: 'uint256', name: 'amount' }
                ],
                event.data,
                event.topics.slice(1)
            );

            return {
                introducer: '0x' + event.topics[1].slice(26),
                amount: decoded.amount.toString() / 10 ** 18,
                blockNumber: event.blockNumber,
                transactionHash: event.transactionHash
            };
        });

        const convertBigIntsToStrings = (data) => {
            return JSON.parse(JSON.stringify(data, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        };



        res.status(200).json(convertBigIntsToStrings(decodedIntroducers));
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events." });
    }
});



router.post("/purchased-token", async (req, res) => {
    try {
        const { walletAddress } = req.body;

        // TokensPurchased Events
        const purchaseEvents = await contract.getPastEvents("TokensPurchased", {
            filter: { buyer: walletAddress },
            fromBlock: 0,
            toBlock: "latest",
        });

        const decodedPurchases = purchaseEvents.map(event => {
            const decoded = web3.eth.abi.decodeLog(
                [
                    { type: 'uint256', name: 'amount' },
                    { type: 'uint256', name: 'cost' }
                ],
                event.data,
                event.topics.slice(1)
            );

            return {
                buyer: '0x' + event.topics[1].slice(26),
                amount: decoded.amount.toString(),
                cost: decoded.cost.toString(),
                blockNumber: event.blockNumber,
                transactionHash: event.transactionHash
            };
        });

        // IntroducerPaid Events
        const introducerEvents = await contract.getPastEvents("IntroducerRewarded", {
            filter: { introducer: walletAddress },
            fromBlock: 0,
            toBlock: "latest",
        });

        const decodedIntroducers = introducerEvents.map(event => {
            const decoded = web3.eth.abi.decodeLog(
                [
                    { type: 'uint256', name: 'amount' }
                ],
                event.data,
                event.topics.slice(1)
            );

            return {
                introducer: '0x' + event.topics[1].slice(26),
                amount: decoded.amount.toString(),
                blockNumber: event.blockNumber,
                transactionHash: event.transactionHash
            };
        });

        // SecondUplinePaid Events
        const uplineEvents = await contract.getPastEvents("SecondUplilneRewarded", {
            filter: { secondUpline: walletAddress },
            fromBlock: 0,
            toBlock: "latest",
        });

        const decodedUplines = uplineEvents.map(event => {
            const decoded = web3.eth.abi.decodeLog(
                [
                    { type: 'uint256', name: 'amount' }
                ],
                event.data,
                event.topics.slice(1)
            );

            return {
                secondUpline: '0x' + event.topics[1].slice(26),
                amount: decoded.amount.toString(),
                blockNumber: event.blockNumber,
                transactionHash: event.transactionHash
            };
        });

        // function convertBigIntsToStrings(obj) {
        //     return JSON.parse(JSON.stringify(obj, (key, value) =>
        //         typeof value === 'bigint' ? value.toString() : value
        //     ));
        // }

        // Combine and return all data
        // res.json(convertBigIntsToStrings({
        //     tokenPurchases: decodedPurchases,
        //     introducerPayments: decodedIntroducers,
        //     secondUplinePayments: decodedUplines
        // }));


        const convertBigIntsToStrings = (data) => {
            return JSON.parse(JSON.stringify(data, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        };


        // Add type field and merge all into a single array
        const allEvents = [
            ...decodedPurchases.map(item => ({ ...item, type: "Purchase" })),
            ...decodedIntroducers.map(item => ({ ...item, type: "Direct Income" })),
            ...decodedUplines.map(item => ({ ...item, type: "Level Income" }))
        ];

        // Optional: sort by block number or time (latest first)
        allEvents.sort((a, b) => {
            const blockA = BigInt(a.blockNumber);
            const blockB = BigInt(b.blockNumber);
            return blockB > blockA ? 1 : blockB < blockA ? -1 : 0;
        });
        // Send response with BigInts converted to strings
        res.json(convertBigIntsToStrings(allEvents));
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ error: "Failed to fetch events." });
    }
});





module.exports = router;