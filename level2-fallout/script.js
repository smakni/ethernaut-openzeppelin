require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0xaCFd52A41cE8e8bBc0ad873B517D38e8A584Ae8e";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"Fal1out",
	"0",
);
