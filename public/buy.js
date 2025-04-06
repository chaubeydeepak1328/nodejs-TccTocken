// // Ensure Web3 is injected by MetaMask
// window.addEventListener('DOMContentLoaded', async () => {
//     if (typeof window.ethereum !== 'undefined') {
//         const web3 = new Web3(window.ethereum);

//         // Ask user to connect wallet
//         await window.ethereum.request({ method: 'eth_requestAccounts' });

//         const contractAddress = "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63";
//         const senderAddress = localStorage.getItem("walletAccount") || (await web3.eth.getAccounts())[0];

//         try {
//             // Load ABI from JSON file
//             const response = await fetch('./contractABI.json'); // Adjust path if needed
//             const abi = await response.json();

//             // Initialize contract
//             const contract = new web3.eth.Contract(abi, contractAddress);

//             // ========================================================================================
//             // script code from index.js
//             // =========================================================================================


//             const fetchWalletData = async () => {
//                 try {
//                     // make the call to the contract
//                     const totalSupply = await contract.methods.TOTAL_SUPPLY().call();

//                     // make the call to the contract
//                     const totalSold = await contract.methods.totalSold().call();

//                     // total remaining = total supply - total sold
//                     const totalRemaining = totalSupply - totalSold;

//                     // make the call to the contract
//                     const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();

//                     const WalletBalance = await web3.eth.getBalance('0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63');

//                     console.log("WalletBalance", web3.utils.fromWei(WalletBalance, 'ether').toString());
//                     console.log("totalSupply", totalSupply.toString());
//                     console.log("totalSold", totalSold.toString());
//                     console.log("totalRemaining", totalRemaining.toString());
//                     console.log("referalAllocation", referalAllocation.toString());

//                     document.getElementById("WalletBalance").innerHTML = web3.utils.fromWei(WalletBalance, 'ether').toString();


//                 } catch (error) {
//                     console.error('Error fetching wallet data:', error);
//                 }
//             };

//             fetchWalletData();


//             const transferButton = document.getElementById("transferButton");
//             const transferAmountInput = document.getElementById("transferAmount");

//             //

//             const sendSepolia = async () => {
//                 console.log("Sending Sepolia...");
//                 try {
//                     const web3 = new Web3(window.ethereum); // create Web3 instance

//                     const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";

//                     const valueInWei = web3.utils.toWei('0.0000001', 'ether');

//                     const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
//                         from: senderAddress,
//                         value: valueInWei
//                     });

//                     console.log("Estimated gas:", estimatedGas);



//                     const gasPrice = await web3.eth.getGasPrice();
//                     const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

//                     const tx = {
//                         from: senderAddress,
//                         to: "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63",
//                         value: valueInWei,
//                         gas: estimatedGas,
//                         gasPrice: gasPrice,
//                         nonce: nonce,
//                         data: contract.methods.buyTokens(referrerAddress).encodeABI()
//                     };


//                     const txHash = await window.ethereum.request({
//                         method: 'eth_sendTransaction',
//                         params: [tx]
//                     });

//                     console.log("Transaction Hash:", txHash);
//                 } catch (err) {
//                     console.error("Transaction Failed:", err);
//                 }
//             };

//             transferButton.addEventListener("click", sendSepolia);

//             // ========================================================================================
//             // script code from index.js
//             // =========================================================================================

//             // Handle transfer button click
//             // document.getElementById("transferButton").addEventListener("click", async () => {
//             //     try {
//             //         const accounts = await web3.eth.getAccounts();
//             //         const sender = accounts[0];

//             //         const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";
//             //         const valueInWei = web3.utils.toWei("0.001", "ether");

//             //         const gasEstimate = await contract.methods.buyTokens(referrerAddress).estimateGas({
//             //             from: sender,
//             //             value: valueInWei
//             //         });

//             //         const tx = await contract.methods.buyTokens(referrerAddress).send({
//             //             from: sender,
//             //             value: valueInWei,
//             //             gas: gasEstimate
//             //         });

//             //         console.log("Transaction Hash:", tx.transactionHash);
//             //         alert(`Transaction successful: ${tx.transactionHash}`);
//             //     } catch (err) {
//             //         console.error("Transaction Error:", err);
//             //         alert("Transaction Failed: " + (err.message || err));
//             //     }
//             // });

//         } catch (error) {
//             console.error("Failed to load ABI or initialize contract:", error);
//             alert("Could not initialize contract. See console for details.");
//         }

//     } else {
//         alert("Please install MetaMask or another Ethereum wallet extension.");
//     }
// });



// window.addEventListener('DOMContentLoaded', async () => {
//     if (typeof window.ethereum === 'undefined') {
//         alert("Please install MetaMask.");
//         return;
//     }

//     // Handle MetaMask events
//     window.ethereum.on("disconnect", () => {
//         alert("MetaMask disconnected. Please reconnect.");
//         location.reload();
//     });

//     window.ethereum.on("accountsChanged", (accounts) => {
//         if (!accounts.length) {
//             alert("Wallet disconnected. Please reconnect.");
//         } else {
//             location.reload();
//         }
//     });

//     window.ethereum.on("chainChanged", () => {
//         location.reload();
//     });

//     try {
//         // Prompt connection
//         await window.ethereum.request({ method: 'eth_requestAccounts' });

//         const web3 = new Web3(window.ethereum);
//         let accounts = await web3.eth.getAccounts();

//         if (!accounts.length) {
//             accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         }

//         const senderAddress = accounts[0];
//         console.log("Connected Wallet Address:", senderAddress);

//         const contractAddress = "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63";

//         // Load ABI
//         const response = await fetch('./contractABI.json');
//         const abi = await response.json();
//         const contract = new web3.eth.Contract(abi, contractAddress);

//         // Fetch and show data
//         const fetchWalletData = async () => {
//             try {
//                 const totalSupply = await contract.methods.TOTAL_SUPPLY().call();
//                 const totalSold = await contract.methods.totalSold().call();
//                 const totalRemaining = totalSupply - totalSold;
//                 const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();
//                 const walletBalance = await web3.eth.getBalance(contractAddress);

//                 console.log("WalletBalance", web3.utils.fromWei(walletBalance, 'ether'));
//                 console.log("totalSupply", totalSupply.toString());
//                 console.log("totalSold", totalSold.toString());
//                 console.log("totalRemaining", totalRemaining.toString());
//                 console.log("referalAllocation", referalAllocation.toString());

//                 document.getElementById("WalletBalance").innerHTML = web3.utils.fromWei(walletBalance, 'ether');
//             } catch (error) {
//                 console.error('Error fetching wallet data:', error);
//             }
//         };

//         await fetchWalletData();

//         const transferButton = document.getElementById("transferButton");

//         const sendSepolia = async () => {
//             console.log("Sending Sepolia...");
//             try {
//                 const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";
//                 const valueInWei = web3.utils.toWei('0.0000001', 'ether');

//                 const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
//                     from: senderAddress,
//                     value: valueInWei
//                 });

//                 const gasPrice = await web3.eth.getGasPrice();
//                 const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

//                 const tx = {
//                     from: senderAddress,
//                     to: contractAddress,
//                     value: valueInWei,
//                     gas: estimatedGas,
//                     gasPrice,
//                     nonce,
//                     data: contract.methods.buyTokens(referrerAddress).encodeABI()
//                 };

//                 const txHash = await window.ethereum.request({
//                     method: 'eth_sendTransaction',
//                     params: [tx]
//                 });

//                 console.log("Transaction Hash:", txHash);
//                 alert(`Transaction sent! Hash: ${txHash}`);
//             } catch (err) {
//                 console.error("Transaction Failed:", err);
//                 alert("Transaction Failed: " + (err.message || err));
//             }
//         };

//         transferButton.addEventListener("click", sendSepolia);

//     } catch (error) {
//         console.error("Error during wallet initialization:", error);
//         alert("Could not initialize wallet. See console for details.");
//     }
// });





// window.addEventListener('DOMContentLoaded', async () => {
//     if (typeof window.ethereum === 'undefined') {
//         alert("Please install MetaMask.");
//         return;
//     }

//     // Handle MetaMask events
//     window.ethereum.on("disconnect", () => {
//         alert("MetaMask disconnected. Please reconnect.");
//         location.reload();
//     });

//     window.ethereum.on("accountsChanged", (accounts) => {
//         if (!accounts.length) {
//             alert("Wallet disconnected. Please reconnect.");
//         } else {
//             location.reload();
//         }
//     });

//     window.ethereum.on("chainChanged", () => {
//         location.reload();
//     });

//     try {
//         // Prompt connection
//         await window.ethereum.request({ method: 'eth_requestAccounts' });

//         const web3 = new Web3(window.ethereum);
//         let accounts = await web3.eth.getAccounts();

//         if (!accounts.length) {
//             accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         }

//         const senderAddress = accounts[0];
//         console.log("Connected Wallet Address:", senderAddress);

//         const contractAddress = "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63";

//         // Load ABI
//         const response = await fetch('./contractABI.json');
//         const abi = await response.json();
//         const contract = new web3.eth.Contract(abi, contractAddress);

//         // Fetch and show data
//         const fetchWalletData = async () => {
//             try {
//                 const totalSupply = await contract.methods.TOTAL_SUPPLY().call();
//                 const totalSold = await contract.methods.totalSold().call();
//                 const totalRemaining = totalSupply - totalSold;
//                 const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();
//                 const walletBalance = await web3.eth.getBalance(contractAddress);

//                 console.log("WalletBalance", web3.utils.fromWei(walletBalance, 'ether'));
//                 console.log("totalSupply", totalSupply.toString());
//                 console.log("totalSold", totalSold.toString());
//                 console.log("totalRemaining", totalRemaining.toString());
//                 console.log("referalAllocation", referalAllocation.toString());

//                 document.getElementById("WalletBalance").innerHTML = web3.utils.fromWei(walletBalance, 'ether');
//             } catch (error) {
//                 console.error('Error fetching wallet data:', error);
//             }
//         };

//         await fetchWalletData();

//         const transferButton = document.getElementById("transferButton");

//         const sendSepolia = async () => {
//             console.log("Sending Sepolia...");
//             try {
//                 const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";
//                 const valueInWei = web3.utils.toWei('0.0000001', 'ether');

//                 const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
//                     from: senderAddress,
//                     value: valueInWei
//                 });

//                 const gasPrice = await web3.eth.getGasPrice();
//                 const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

//                 const tx = {
//                     from: senderAddress,
//                     to: contractAddress,
//                     value: valueInWei,
//                     gas: estimatedGas,
//                     gasPrice,
//                     nonce,
//                     data: contract.methods.buyTokens(referrerAddress).encodeABI()
//                 };

//                 const txHash = await window.ethereum.request({
//                     method: 'eth_sendTransaction',
//                     params: [tx]
//                 });

//                 console.log("Transaction Hash:", txHash);
//                 alert(`Transaction sent! Hash: ${txHash}`);
//             } catch (err) {
//                 console.error("Transaction Failed:", err);
//                 alert("Transaction Failed: " + (err.message || err));
//             }
//         };

//         transferButton.addEventListener("click", sendSepolia);

//     } catch (error) {
//         console.error("Error during wallet initialization:", error);
//         alert("Could not initialize wallet. See console for details.");
//     }
// });

document.getElementById('copy').addEventListener('click', function () {
    const input = document.querySelector('#link');
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(input.value).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
});



const checkWalletSign = async () => {
    // const web3 = new Web3(window.ethereum);
    try {
        // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        // const account = accounts[0];


        // performing otehr operation 
        const account = localStorage.getItem("walletAddress");

        const walletLink = document.getElementById("link");
        if (walletLink) {
            walletLink.value = `https://tcc20.com/userDashboard?walletadd=${account}`;
        } else {
            console.warn("Input with ID 'walletLink' not found in the DOM.");
        }


        const urlParams = new URLSearchParams(window.location.search);
        const walletAddress = urlParams.get('walletadd');

        if (walletAddress) {
            const input = document.getElementById('referalAddress');
            if (input) {
                input.value = walletAddress;
                input.readOnly = true; // <-- This makes it readonly
            }
        }


        // performing otehr operation  End


        if (!account) {
            window.location.href = "/";
        } else {
            console.log("Connected account:", account);
        }
    } catch (error) {

        console.error("Error connecting to wallet:", error);
    }
}




const sendEthButton = document.querySelector('.sendEthButton');
const transferAmountInput = document.getElementById("transferAmount");
const transferButton = document.getElementById("transferButton");
const referral = document.getElementById("referalAddress");



const web3 = new Web3(window.ethereum); // create Web3 instance
let abi = [];
let accounts = [localStorage.getItem("walletAddress"), ''];
let contract = null;
const contractAddress = "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9";

const fetchAbi = async () => {
    const response = await fetch('./contractABI.json');
    abi = await response.json();
    console.log("ABI", abi);


    contract = new web3.eth.Contract(abi, contractAddress);
}



// const fetchWalletData = async () => {
//     try {
//         // make the call to the contract
//         const totalSupply = await contract.methods.TOTAL_SUPPLY().call();

//         // make the call to the contract
//         const totalSold = await contract.methods.totalSold().call();

//         // total remaining = total supply - total sold
//         const totalRemaining = totalSupply - totalSold;

//         // make the call to the contract
//         const referalAllocation = await contract.methods.TOTAL_REFERRAL_ALLOCATION().call();

//         const WalletBalance = await web3.eth.getBalance(contractAddress);

//         console.log("WalletBalance", web3.utils.fromWei(WalletBalance, 'ether').toString());
//         console.log("totalSupply", totalSupply.toString());
//         console.log("totalSold", totalSold.toString());
//         console.log("totalRemaining", totalRemaining.toString());
//         console.log("referalAllocation", referalAllocation.toString());

//         document.getElementById("WalletBalance").innerHTML = web3.utils.fromWei(WalletBalance, 'ether').toString();


//     } catch (error) {
//         console.error('Error fetching wallet data:', error);
//     }
// };





// const contract = new web3.eth.Contract(abi, "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63");








// const walletTransfer = async () => {

//     console.log("Sending came here...=====1");
//     const amountInEth = transferAmountInput.value;
//     const referrerAddress = referral.value // Default address if not provided

//     if (!amountInEth || isNaN(amountInEth) || Number(amountInEth) <= 0) {
//         alert("Please enter a valid amount.");
//         return;
//     }


//     console.log("Sending came here...=====2");


//     console.log(amountInEth)

//     const valueInWei = Web3.utils.toWei(amountInEth, 'ether');

//     console.log("Sending came here...=====3", web3.utils.toHex(BigInt(valueInWei)));

//     console.log("from", accounts[0]);
//     console.log("to", contractAddress);
//     console.log("referrerAddress", referrerAddress);



//     const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
//         from: accounts[0],
//         value: valueInWei
//     });

//     const gasPrice = await web3.eth.getGasPrice();

//     const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

//     const txParams = {
//         from: accounts[0],
//         to: contractAddress,
//         value: web3.utils.toHex(BigInt(valueInWei)),
//         gas: web3.utils.toHex(BigInt(estimatedGas)),
//         gasPrice: web3.utils.toHex(BigInt(gasPrice)),
//         nonce: web3.utils.toHex(nonce),
//         data: contract.methods.buyTokens(referrerAddress).encodeABI()
//     };

//     console.log("Sending transaction:", txParams);

//     try {
//         const txHash = await ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [txParams],
//         });

//         console.log("Transaction Hash:", txHash);
//     } catch (error) {
//         console.error("Transaction Failed:", error);
//         alert("Transaction failed: " + error.message);
//     }
// }


if (transferButton) {
    transferButton.addEventListener('click', walletTransfer);
}



const fetchUserDetails = async () => {

    console.log("Fetching user details...", accounts[0]);
    try {
        const response = await fetch("/user_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: accounts[0] }),
        });

        const data = await response.json();
        console.log("User details:", data.data.getDirectReferralsCount);

        document.getElementById("totalBoughtTokens").innerHTML = ((data.data.totalBoughtTokens) / 10 ** 18).toString() + " TCC";
        document.getElementById("tier1Rewards").innerHTML = ((data.data.tier1Rewards) / 10 ** 18).toString() + " TCC";
        document.getElementById("tier2Rewards").innerHTML = ((data.data.tier2Rewards) / 10 ** 18).toString() + " TCC";
        document.getElementById("communityEarning").innerHTML = parseFloat((data.data.tier1Rewards) / 10 ** 18) + parseFloat((data.data.tier2Rewards) / 10 ** 18) + " TCC";
        document.getElementById("totalCoinSold").innerHTML = ((data.data.totalSold) / 10 ** 18).toString() + " TCC";
        document.getElementById("getDirectReferalCount").innerHTML = data.data.getDirectReferralsCount.toString();
        document.getElementById("totalReferalEarning").innerHTML = ((data.data.tier1Rewards) / 10 ** 18).toString() + " TCC";



    } catch (error) {
        console.error('Error fetching wallet data:', error);
    }
};



const fetchWalletTransactions = async () => {
    const walletAddress = accounts[0];
    const etherscanApiKey = 'JRA6JIVJQCK333XNWDZTFV7A7SFSYKB9XD';
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Wallet transactions:", result);

        if (result.status === "1") {
            const txs = result.result;

            // Filter: Only transactions made to your contract address
            const contractTxs = txs.filter(tx => tx.to?.toLowerCase() === contractAddress.toLowerCase());

            console.log("Transactions sent to contract:", contractTxs);

            // Log value in ETH correctly
            contractTxs.forEach(tx => {
                const ethValue = web3.utils.fromWei(tx.value.toString(), 'ether');
                console.log(`Hash: ${tx.hash}, Value: ${ethValue} ETH`);
            });

            const tbody = document.getElementById('transactionBody');
            tbody.innerHTML = ''; // Optional: Clear previous rows

            contractTxs.forEach(tx => {
                const ethValue = web3.utils.fromWei(tx.value.toString(), 'ether');
                const readableTime = new Date(tx.timeStamp * 1000).toLocaleString();

                const row = document.createElement('tr');
                row.innerHTML = `
                  <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                    <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank" class="font-medium">${tx.hash.slice(0, 10)}...</a>
                  </td>
                  <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                    <p>${readableTime}</p>
                    <span class="text-xs">Block: ${tx.blockNumber}</span>
                  </td>
                  <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${ethValue} ETH</td>
                  <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${tx.from}</td>
                  <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${tx.to}</td>
                 
                  
                `;
                tbody.appendChild(row);
            });

        } else {
            console.error("Error fetching transactions:", result.message);
        }
    } catch (err) {
        console.error("Failed to fetch wallet transactions:", err);
    }
};




document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        await checkWalletSign();
        // await getAccount();
        await fetchAbi();
        await fetchUserDetails();
        await fetchWalletTransactions();
        // await fetchWalletData();
        // ethereumButton.innerText = 'Connect Wallet';
    } else {
        console.log('Please install MetaMask!');
        ethereumButton.innerText = 'Install MetaMask';
    }
});

// async function getAccount() {
//     accounts = await ethereum.request({ method: 'eth_requestAccounts' });
// }



