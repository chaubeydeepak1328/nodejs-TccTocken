
let accounts = [localStorage.getItem("walletAddress"), ""];

const contractAddress = "0xe3eafae0A321D6d40fcA7103876A7eBA4C5855E9";




// const fetchDirectEarning = async () => {
//     const directbody = document.getElementById('LevelEbody');
//     if (!directbody) {
//         console.warn("Table body #DireactEBody not found!");
//         return;
//     }

//     // Fetch the direct referrals of the connected account
//     const directReferals = await contract.methods.getUpline(accounts[0], 2).call();
//     console.log("Direct Referral", directReferals);

//     directbody.innerHTML = ""; // Clear existing rows

//     for (let index = 0; index < directReferals.length; index++) {
//         const walletAddress = directReferals[index];

//         try {
//             // Fetch user details associated with each wallet address
//             const response = await fetch("/user_details", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ walletAddress }),
//             });

//             const resData = await response.json();
//             const data = resData.data;

//             // Fallback values if not present
//             const referrer = data.referrer || "N/A";
//             const tier1 = ((data.tier1Rewards) / 10 ** 18).toString() || "0";
//             const tier2 = ((data.tier2Rewards) / 10 ** 18).toString() || "0";
//             const totalTokenPurchased = ((data.totalBoughtTokens) / 10 ** 18).toString() || "0";

//             console.log("Direct Referral", walletAddress, referrer, tier1, tier2);

//             // Create a new row for the table
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td class="whitespace-nowrap py-4 ps-4 pe-3 text-sm font-medium text-gray-700 dark:text-gray-300">
//                     <b>#${index + 1}</b>
//                 </td>
//                 <td class="whitespace-nowrap py-4 pe-3 text-sm">
//                     <div class="flex items-center">
//                         <div class="font-medium text-gray-700 dark:text-gray-300 ms-4">
//                             ${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}
//                         </div>
//                     </div>
//                 </td>
//                 <td class="text-sm text-gray-700 dark:text-gray-300">${referrer.slice(0, 5)}...${referrer.slice(-4)}</td>

//                 <td class="text-sm text-gray-700 dark:text-gray-300">${(totalTokenPurchased * 2) / 100}</td>
//                   <td class="text-sm text-gray-700 dark:text-gray-300">${totalTokenPurchased}</td>
//             `;
//             directbody.appendChild(row);

//         } catch (err) {
//             console.error(`Error fetching data for wallet ${walletAddress}:`, err);
//         }
//     }
// };



const fetchLevelEarning = async () => {
    const directbody = document.getElementById('LevelEbody');
    if (!directbody) {
        console.warn("Table body #LevelEbody not found!");
        return;
    }

    try {
        const response = await fetch("/level-earning", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: accounts[0] }),
        });

        const resData = await response.json();
        const referrals = resData?.data || [];

        console.log("Direct Earning Referrals:", referrals);

        directbody.innerHTML = ""; // Clear existing rows

        if (referrals.length === 0) {
            directbody.innerHTML = `<tr><td colspan="6" class="text-center text-gray-500 p-4">No referrals found.</td></tr>`;
            return;
        }

        referrals.forEach((item, index) => {
            const wallet = item.walletAddress || "N/A";
            const referrer = item.referrer || "N/A";
            const reward = item.reward || "0.00000";
            const totalTokens = item.totalTokenPurchased || "0.00000";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="py-4 ps-4 pe-3 text-sm font-medium text-gray-700 dark:text-gray-300"><b>#${index + 1}</b></td>
                <td class="py-4 pe-3 text-sm text-gray-700 dark:text-gray-300">${wallet.slice(0, 5)}...${wallet.slice(-4)}</td>
                <td class="py-4 pe-3 text-sm text-gray-700 dark:text-gray-300">${referrer.slice(0, 5)}...${referrer.slice(-4)}</td>
                <td class="py-4 pe-3 text-sm text-gray-700 dark:text-gray-300">${totalTokens}</td>
                <td class="py-4 pe-3 text-sm text-gray-700 dark:text-gray-300">${reward}</td>
            `;
            directbody.appendChild(row);
        });

    } catch (err) {
        console.error("Error fetching direct earnings:", err);
    }
};




const btn = document.getElementById("Logout");

const Logout = async () => {

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Clear all cookies
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });


    // Redirect to homepage
    location.href = "/";
};



if (btn) {
    btn.addEventListener("click", Logout)
}







document.addEventListener('DOMContentLoaded', async () => {

    // await getAccount(); // ✅ Ensure accounts are set
    await fetchLevelEarning(); // ✅ Now contract and accounts are ready

});






