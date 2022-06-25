require("dotenv").config();
const attack = require("../scripts/attack") 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const abi = require("./abi.json");
const contractAddress = "0xA74746dE333958789c0e57Aeb12515a050F438FF";
const contract = new web3.eth.Contract(abi, contractAddress);

attack(
	contract,
	"write",
	"withdraw",
	"0",
);
