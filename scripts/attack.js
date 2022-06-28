require("dotenv").config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

async function readValue(contract, method, params) {
	try {
		console.log("Params:", params)
		let smartContractValue = await contract.methods[method](...params).call();
		console.log(`Read ${method} params: ${params} value:`, smartContractValue);
	} catch (error) {
		console.log("Error readValue:", error);
	}
}

async function createTransaction(contract, method, ethValue, params) {
	try {
		console.log("Params:", params)
		const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // get latest nonce

		// let gasPrice = await web3.eth.getGasPrice();

		txData = !params
			? contract.methods[method]().encodeABI()
			: contract.methods[method](...params).encodeABI();

		let gweiValue = web3.utils.toWei(ethValue);

		let estimatedGas = await web3.eth.estimateGas({
			from: PUBLIC_KEY,
			to: contract._address,
			data: txData,
			value: gweiValue,
		});

		const tx = {
			from: PUBLIC_KEY,
			to: contract._address,
			none: nonce,
			gas: estimatedGas.toString(),
			// 'gasPrice': gasPrice,
			data: txData,
			value: gweiValue,
		};

		console.log("Transaction", tx);

		return tx;
	} catch (error) {
		console.log("Error createTransaction:", error);
	}
}


// type = write || read
// methode = smart contrat function (abi)

async function attack(contract, type, method, ethValue, ...params) {
	try {
		console.log("CONTRACT", contract._address)
		console.log("PUBLIC KEY", PUBLIC_KEY)
		if (type == "write") {
			const tx = await createTransaction(contract, method, ethValue, params);
			const signPromise = web3.eth.accounts.signTransaction(
				tx,
				PRIVATE_KEY
			);
			signPromise
				.then((signedTx) => {
					web3.eth.sendSignedTransaction(
						signedTx.rawTransaction,
						function (err, hash) {
							if (!err) {
								console.log(
									"the hash of your transaction is: ",
									hash,
									"\nCheck Alchemy's Mempool to view the status of your transaction!"
								);
								console.log(`https://rinkeby.etherscan.io/tx/${hash}`)
							} else {
								console.log(
									"Something went wrong when submitting your transaction",
									err
								);
							}
						}
					);
				})
				.catch((err) => {
					console.log(" Promise failed:", err);
				});
		} else {
			readValue(contract, method, params);
		}
	} catch (e) {
		console.log("error:", e);
	}
}

module.exports = attack;