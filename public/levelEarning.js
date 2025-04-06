

const checkWalletSign = async () => {
    const web3 = new Web3(window.ethereum);
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];

        if (!account) {
            window.location.href = "/";
        } else {
            console.log("Connected account:", account);
        }
    } catch (error) {

        console.error("Error connecting to wallet:", error);
    }
}



const web3 = new Web3(window.ethereum); // create Web3 instance
let abi = [];
let accounts = [];
let contract = null;
const contractAddress = "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9";

const fetchAbi = async () => {
    const response = await fetch('./contractABI.json');
    abi = await response.json();
    console.log("ABI", abi);


    contract = new web3.eth.Contract(abi, contractAddress);
}



const fetchDirectEarning = async () => {
    const directbody = document.getElementById('LevelEbody');
    if (!directbody) {
        console.warn("Table body #DireactEBody not found!");
        return;
    }

    // Fetch the direct referrals of the connected account
    const directReferals = await contract.methods.getUpline(accounts[0], 2).call();
    console.log("Direct Referral", directReferals);

    directbody.innerHTML = ""; // Clear existing rows

    for (let index = 0; index < directReferals.length; index++) {
        const walletAddress = directReferals[index];

        try {
            // Fetch user details associated with each wallet address
            const response = await fetch("/user_details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ walletAddress }),
            });

            const resData = await response.json();
            const data = resData.data;

            // Fallback values if not present
            const referrer = data.referrer || "N/A";
            const tier1 = ((data.tier1Rewards) / 10 ** 18).toString() || "0";
            const tier2 = ((data.tier2Rewards) / 10 ** 18).toString() || "0";
            const totalTokenPurchased = ((data.totalBoughtTokens) / 10 ** 18).toString() || "0";

            console.log("Direct Referral", walletAddress, referrer, tier1, tier2);

            // Create a new row for the table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="whitespace-nowrap py-4 ps-4 pe-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <b>#${index + 1}</b>
                </td>
                <td class="whitespace-nowrap py-4 pe-3 text-sm">
                    <div class="flex items-center">
                        <div class="font-medium text-gray-700 dark:text-gray-300 ms-4">
                            ${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}
                        </div>
                    </div>
                </td>
                <td class="text-sm text-gray-700 dark:text-gray-300">${referrer.slice(0, 5)}...${referrer.slice(-4)}</td>
              
                <td class="text-sm text-gray-700 dark:text-gray-300">${tier2}</td>
                  <td class="text-sm text-gray-700 dark:text-gray-300">${totalTokenPurchased}</td>
            `;
            directbody.appendChild(row);

        } catch (err) {
            console.error(`Error fetching data for wallet ${walletAddress}:`, err);
        }
    }
};













document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        await checkWalletSign();
        await fetchAbi(); // ✅ Wait for ABI to load and contract to initialize
        await getAccount(); // ✅ Ensure accounts are set
        await fetchDirectEarning(); // ✅ Now contract and accounts are ready
    } else {
        console.log('Please install MetaMask!');
        ethereumButton.innerText = 'Install MetaMask';
    }
});


async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}



