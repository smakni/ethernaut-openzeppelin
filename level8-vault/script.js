require("dotenv").config();
// const Web3 = require('web3');
// const web3 = new Web3();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const bytes32Password = '0x412076657279207374726f6e67207365637265742070617373776f7264203a29'

const decodedParameters = web3.utils.hexToAscii(bytes32Password);

console.log(decodedParameters)

const abi = require("./abi.json");
const contractAddress = "0x8fc0639B07206720aAD901cD69E9A1E163c7a753";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"unlock",
	"0",
	bytes32Password
);
