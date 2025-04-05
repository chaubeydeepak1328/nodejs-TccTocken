async function getReceipt(txHash) {
    try {
        const transaction = await web3.eth.getTransactionReceipt(txHash);

        if (transaction) {



            const sender = transaction['from'
            ]
            const recipient_contract = transaction['to'
            ]
            // const input_data = transaction['input']
            const usdt_contract_address = '0x6a2b234dfc53ab431affbe9eb80bb2adc0b04b63'

            console.log(sender, recipient_contract, input_data, usdt_contract_address)

            funcname, function_params = usdt_contract.decode_function_input(input_data)

            if (funcname.fn_name == "transfer") {
                recipient = function_params['recipient'
                ]
                amount = web3.from_wei(function_params['amount'
                ], 'ether')


                if (amount <= 0) {

                    return JsonResponse({
                        'success': False, 'error': 'Invalid amount'
                    })
                }

                amountInUSD = amount

                console.log("Transaction Receipt:", receipt);
            }
        } else {
            console.log("Transaction not yet mined. Please wait...");
        }
    } catch (error) {
        console.error("Error fetching receipt:", error.message);
    }
}