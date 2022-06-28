require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0xB4721dF9C5298B61E2454Ca26ab361d3CeF9dcB7";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"transfer",
	"0",
	"0xDEfEc5CC21594E55BdDC5F84de409232Aff2318c",
	21
);
