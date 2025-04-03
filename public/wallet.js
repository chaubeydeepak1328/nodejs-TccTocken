import { EthereumProvider } from '@walletconnect/ethereum-provider';
import Web3 from 'web3';

const myWalletConnect = async () => {
    const provider = await EthereumProvider.init({
        // projectId: '7490272862d63236aa7a92d593202d5e',
        projectId: '84514467642e09737867371242627261',
        metadata: {
            name: 'Infinity Trade',
            description: 'Infinity Trade a trading and earning platform',
            url: 'https://www.infinitytrade.world',
            icons: ['https://avatars.githubusercontent.com/u/37784886']

        },
        showQrModal: true,
        // optionalChains: [1, 56, 137, 2020],
        optionalChains: [56],
        rpcMap: {
            // 1: 'https://mainnet.infura.io/v3/3ca323afa29143b8a8d9dcbc148d915e',
            56: 'https://bsc-dataseed.binance.org/',
            // 137: 'https://polygon-rpc.com'
        }
    });

    function getCSRFToken() {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        return cookieValue ? cookieValue.split('=')[1] : null;
    }



    async function save_wallet_in_database(wallet_address) {

        console.log('wallet address is', wallet_address);
        try {
            const csrfToken = getCSRFToken();
            const response = await fetch('/member/savewalletindb/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Ensure csrftoken is passed correctly
                },
                body: JSON.stringify({ wallet_address })
            });
            const data = await response.json();
            if (data.success) {
                console.log('address saved successfully is', wallet_address);
                return 1

            } else {

                console.log('somethinf went wrong');


                // location.reload();
            }
        } catch (error) {

            console.error('Error sending transaction hash to Django:', error);
        }
    }





    async function connectWallet() {
        try {
            await provider.enable();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            // Save account to localStorage

            const bscWeb3 = new Web3('https://bsc-dataseed.binance.org/');
            const bnbBalance = await bscWeb3.eth.getBalance(account);
            const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT contract address on BSC
            const response = await fetch('/member/get-usdt-abi/');
            const data = await response.json();
            if (!data.abi) {
                throw new Error('Failed to retrieve USDT contract ABI');
            }
            const usdtABI = data.abi;

            // const usdtContract = new bscWeb3.eth.Contract(usdtABI, usdtContractAddress);
            const usdtContract = new bscWeb3.eth.Contract(usdtABI, usdtContractAddress);
            const usdtBalance = await usdtContract.methods.balanceOf(account).call();
            const usdtBalanceInEth = bscWeb3.utils.fromWei(usdtBalance, 'ether');

            console.log('Connected account:', account);

            connectButton.innerText = `Connected: ${usdtBalanceInEth} USDT`;
            connectButton.disabled = true;
            connectButton.classList.add('disabled');

            let st = await save_wallet_in_database(account);
            console.log(st);

            if (walletAdd) {
                walletAdd.value = `${account}`;
            }
            localStorage.setItem('connectedAccount', account);
            return { web3, account, usdtContract, usdtBalance, usdtBalanceInEth };

        } catch (error) {
            console.error('Error connecting wallet:', error);
        }


    }

    async function disconnectWallet() {
        try {
            if (currentAccount) {
                await provider.disconnect(); // Disconnect the wallet
                //currentAccount = null; // Reset the current account
                connectButton.innerText = 'Connect Wallet'; // Reset button text
                connectButton.disabled = false; // Enable connect button
                connectButton.classList.remove('disabled'); // Remove disabled class
                walletAdd.value = ''; // Clear wallet address field
                localStorage.removeItem('connectedAccount'); // Clear the connected account from localStorage
                alert('Wallet disconnected successfully.'); // Notify user
            } else {
                alert('No wallet is currently connected.');
            }
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    }

    async function sendTransactionHashToDjango(transactionHash, tranTimeCoinValue, coinName, cryptoAmount, amount) {
        try {
            const response = await fetch('/member/verify-transaction/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': `{{csrf_token}}` // Ensure csrftoken is passed correctly
                },
                body: JSON.stringify({ transactionHash, tranTimeCoinValue, coinName, cryptoAmount, amount })
            });
            const data = await response.json();
            if (data.success) {
                alert('Transaction verified and funds added to your wallet.');
                location.reload(); // Reload the page
            } else {
                alert('Transaction verification failed.');
                location.reload();
            }
        } catch (error) {
            console.error('Error sending transaction hash to Django:', error);
        }
    }

    const storedAccount = localStorage.getItem('connectedAccount');
    if (storedAccount) {
        await reconnectWallet(storedAccount); // Reconnect if wallet is already connected
    }



    async function payWithWallet() {


        try {
            const response = await fetch(`/member/get-busd-price/`);
            const data = await response.json();
            const priceInUsd = data.price;
            const amnt = document.getElementById('amount').value;

            if (!amnt || parseFloat(amnt) < 0) {
                alert('Invalid amount');
                location.reload();
                return;
            }

            const { web3, account, usdtContract, usdtBalance, usdtBalanceInEth } = await connectWallet();
            // const cryptoAmount = (amnt / priceInUsd).toFixed(18);
            const usdtAmount = web3.utils.toWei((amnt / priceInUsd).toFixed(18), 'ether');
            console.log('balance in eth is', usdtBalanceInEth);
            console.log('balance in usdt eth is is', amnt);


            // if (parseFloat(usdtBalanceInEth) < parseFloat(usdtAmount)) {
            if (parseFloat(usdtBalanceInEth) < parseFloat(amnt)) {
                alert(`Insufficient USDT balance. You need at least ${usdtBalanceInEth} USDT in your wallet to proceed.`);
                return;
            }

            // console.log('came to send transaction');

            // const txData = usdtContract.methods.transfer('0xd8956286e0A26E42ed5d3BD02D802B38B711D8aB', usdtAmount).encodeABI();
            const txData = usdtContract.methods.transfer('0x83c2cc4E02b329710c5b39f5AF2c5A5922c16756', usdtAmount).encodeABI();
            const nonce = await web3.eth.getTransactionCount(account, 'latest');
            const gasPrice = await web3.eth.getGasPrice();

            const gasLimit = await web3.eth.estimateGas({
                from: account,
                to: usdtContract.options.address,
                data: txData
            });



            console.log('gas limit is', gasLimit);
            const gasCost = web3.utils.fromWei((gasLimit * gasPrice).toString(), 'ether');

            // Check if the user has enough BNB to cover gas fees
            const bnbBalance = await web3.eth.getBalance(account);
            const bnbBalanceInEth = web3.utils.fromWei(bnbBalance, 'ether');

            if (parseFloat(bnbBalanceInEth) < parseFloat(gasCost)) {
                alert(`Insufficient BNB balance to cover gas fees. You need at least ${gasCost} BNB.`);
                return;
            }


            const tx = {
                from: account,
                to: usdtContract.options.address,
                data: txData,
                gas: gasLimit,
                gasPrice: gasPrice, // Adjust the gas price as needed or use web3.eth.generateGasPrice()
                nonce: nonce,
                chainId: 56 //
            }

            web3.eth.sendTransaction(tx).on('transactionHash', function (hash) {
                console.log('Transaction Hash:', hash);
                sendTransactionHashToDjango(hash, priceInUsd, 'USDT', usdtAmount, amnt);


            })
                .on('error', console.error);





        } catch (error) {
            console.error('Error in payment process:', error);
        }
    }




    async function reconnectWallet(storedAccount) {
        try {
            if (!provider.connected) {
                await provider.enable();
            }
            const web3 = new Web3(provider);
            // const usdtBalanceInEth = await getUSDTBalance(web3, storedAccount);

            const bscWeb3 = new Web3('https://bsc-dataseed.binance.org/');
            const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT contract address on BSC
            const response = await fetch('/member/get-usdt-abi/');
            const data = await response.json();
            if (!data.abi) {
                throw new Error('Failed to retrieve USDT contract ABI');
            }
            const usdtABI = data.abi;
            const usdtContract = new bscWeb3.eth.Contract(usdtABI, usdtContractAddress);
            const usdtBalance = await usdtContract.methods.balanceOf(storedAccount).call();
            const usdtBalanceInEth = web3.utils.fromWei(usdtBalance, 'ether');

            connectButton.innerText = `Connected: ${usdtBalanceInEth} USDT`;
            connectButton.disabled = true;
            connectButton.classList.add('disabled');

            if (walletAdd) {
                walletAdd.value = storedAccount;
            }
        } catch (error) {
            console.error('Error reconnecting wallet:', error);
            localStorage.removeItem('connectedAccount');
        }
    }
    // Function to reconnect the wallet using the stored address


    connectButton.addEventListener('click', connectWallet);
    payButton.addEventListener('click', payWithWallet);
    // disconnectButton.addEventListener('click', disconnectWallet); // Add disconnect functionality

}
