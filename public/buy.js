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



const sendEthButton = document.querySelector('.sendEthButton');
const transferAmountInput = document.getElementById("transferAmount");
const transferButton = document.getElementById("transferButton");



const web3 = new Web3(window.ethereum); // create Web3 instance
let abi = [];
let accounts = [];
let contract = null;

const fetchAbi = async () => {
    const response = await fetch('./contractABI.json');
    abi = await response.json();
    console.log("ABI", abi);


    contract = new web3.eth.Contract(abi, "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63");
}

fetchAbi();




// const contract = new web3.eth.Contract(abi, "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63");








const walletTransfer = async () => {

    console.log("Sending came here...=====1");
    const amountInEth = transferAmountInput.value;

    if (!amountInEth || isNaN(amountInEth) || Number(amountInEth) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }


    console.log("Sending came here...=====2");


    console.log(amountInEth)

    const valueInWei = Web3.utils.toWei(amountInEth, 'ether');
    // console.log("Gas Price:", gasPrice, web3.utils.toHex(BigInt(valueInWei)));

    console.log("Sending came here...=====3", web3.utils.toHex(BigInt(valueInWei)));
    // 10000000000000


    const referrerAddress = "0x00DcE81144af45AEeE39b606844dFf1E53597446";
    const estimatedGas = await contract.methods.buyTokens(referrerAddress).estimateGas({
        from: accounts[0],
        value: valueInWei
    });

    // console.log("Sending came here...=====4");


    // console.log("Estimated gas:", estimatedGas);


    const gasPrice = await web3.eth.getGasPrice();


    // console.log("Gas Price:", gasPrice, web3.utils.toHex(web3.utils.toHex(BigInt(valueInWei))));

    // console.log("Sending came here...=====6");

    const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

    // const tx = {
    //     from: senderAddress,
    //     to: "0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63",
    //     value: valueInWei,
    //     gas: estimatedGas,
    //     gasPrice: gasPrice,
    //     nonce: nonce,
    //     data: contract.methods.buyTokens(referrerAddress).encodeABI()
    // };


    const txParams = {
        from: accounts[0],
        to: '0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63',
        value: web3.utils.toHex(BigInt(valueInWei)),
        gas: web3.utils.toHex(BigInt(estimatedGas)),
        gasPrice: web3.utils.toHex(BigInt(gasPrice)),
        nonce: web3.utils.toHex(nonce),
        data: contract.methods.buyTokens(referrerAddress).encodeABI()
    };

    console.log("Sending transaction:", txParams);

    try {
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [txParams],
        });

        console.log("Transaction Hash:", txHash);
    } catch (error) {
        console.error("Transaction Failed:", error);
        alert("Transaction failed: " + error.message);
    }

    // const txParams = {
    //     from: accounts[0],
    //     to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
    //     value: web3.utils.toHex(valueInWei),
    //     gasPrice: web3.utils.toHex(gasPrice),
    //     gas: web3.utils.toHex(estimatedGas),
    // };

    // ethereum
    //     .request({
    //         method: 'eth_sendTransaction',
    //         params: [
    //             {
    //                 from: accounts[0],
    //                 to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
    //                 value: valueInWei,
    //                 gasPrice: gasPrice,
    //                 gas: estimatedGas,
    //             },
    //         ],
    //     })
    //     .then((txHash) => console.log(txHash))
    //     .catch((error) => console.error);
}

//Sending Ethereum to an address
transferButton.addEventListener('click', walletTransfer);

// ethereumButton.addEventListener('click', () => {
//     getAccount();
// });


document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        await getAccount();
        await fetchAbi();
        // ethereumButton.innerText = 'Connect Wallet';
    } else {
        console.log('Please install MetaMask!');
        ethereumButton.innerText = 'Install MetaMask';
    }
});

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}



