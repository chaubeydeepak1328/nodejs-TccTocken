
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
    try {
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



let abi = [];
let accounts = [localStorage.getItem("walletAddress"), ''];
let contract = null;
const contractAddress = "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9";



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



// const fetchWalletTransactions = async () => {
//     try {
//         const response = await fetch(url);
//         const result = await response.json();
//         console.log("Wallet transactions:", result);

//         if (result.status === "1") {
//             const txs = result.result;

//             // Filter: Only transactions made to your contract address
//             const contractTxs = txs.filter(tx => tx.to?.toLowerCase() === contractAddress.toLowerCase());

//             console.log("Transactions sent to contract:", contractTxs);

//             // Log value in ETH correctly
//             contractTxs.forEach(tx => {
//                 const ethValue = web3.utils.fromWei(tx.value.toString(), 'ether');
//                 console.log(`Hash: ${tx.hash}, Value: ${ethValue} ETH`);
//             });

//             const tbody = document.getElementById('transactionBody');
//             tbody.innerHTML = ''; // Optional: Clear previous rows

//             contractTxs.forEach(tx => {
//                 const ethValue = web3.utils.fromWei(tx.value.toString(), 'ether');
//                 const readableTime = new Date(tx.timeStamp * 1000).toLocaleString();

//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                   <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
//                     <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank" class="font-medium">${tx.hash.slice(0, 10)}...</a>
//                   </td>
//                   <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
//                     <p>${readableTime}</p>
//                     <span class="text-xs">Block: ${tx.blockNumber}</span>
//                   </td>
//                   <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${ethValue} ETH</td>
//                   <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${tx.from}</td>
//                   <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">${tx.to}</td>


//                 `;
//                 tbody.appendChild(row);
//             });

//         } else {
//             console.error("Error fetching transactions:", result.message);
//         }
//     } catch (err) {
//         console.error("Failed to fetch wallet transactions:", err);
//     }
// };


const fetchWalletTransactions = async () => {
    console.log("Fetching user details...", accounts[0]);

    try {
        const response = await fetch("/purchased-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: accounts[0] }),
        });

        const data = await response.json();
        console.log("Transaction Data:", data);

        const tbody = document.getElementById('transactionBody');
        tbody.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(tx => {
                // Safely get the participant (buyer, introducer, or secondUpline)
                const participant =
                    tx.buyer || tx.introducer || tx.secondUpline || "N/A";

                // Format amounts (from wei to ether/token)
                const formatEther = (wei) =>
                    (Number(wei) / 1e18).toFixed(4);

                const amountFormatted = tx.amount ? formatEther(tx.amount) : "-";
                const costFormatted = tx.cost ? formatEther(tx.cost) + " BNB" : "-";

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                        <a href="https://testnet.bscscan.com/tx/${tx.transactionHash}"
                           target="_blank" 
                           class="font-medium">
                           ${tx.transactionHash.slice(0, 10)}...
                        </a>
                    </td>
                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                        ${tx.type}
                    </td>
                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                        ${amountFormatted}
                    </td>
                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                        ${costFormatted}
                    </td>
                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                        ${participant}
                    </td>
                   
                `;
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-gray-500 p-4">
                        No transactions found.
                    </td>
                </tr>
            `;
        }
    } catch (err) {
        console.error("Failed to fetch wallet transactions:", err);
    }
};




const wAddress = document.getElementById("userWalletAdress")

if (wAddress) {
    const wallet = localStorage.getItem("walletAddress");
    userWalletAdress.innerHTML = wallet.slice(0, 4) + "..." + wallet.slice(-5)
}



document.addEventListener('DOMContentLoaded', async () => {

    await checkWalletSign();

    await fetchWalletTransactions();

    await fetchUserDetails();


});





