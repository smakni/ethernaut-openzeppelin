require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0x7748447584c671a0ec6e0088e317224db38b1f0c";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"withdraw",
	"0",
);
