# SOLUTION
## Links
https://ethereum.stackexchange.com/questions/21448/how-to-get-a-contracts-balance-in-solidity

https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9

https://ethereum.stackexchange.com/questions/63987/can-a-contract-with-no-payable-function-have-ether/63988#63988

https://solidity-by-example.org/hacks/self-destruct/?ref=hackernoon.com

Target: https://rinkeby.etherscan.io/address/0xE859Ce4dD0601ae16051d6795c4B27C0ea11CDe0#code

Exploit: https://rinkeby.etherscan.io/address/0xdfbcf3cec3b81deeb99e447815c16058f714c352

The goal is to send eth to an empty contract with no payble function
Here we are going to exploit the seflDestruction throw the close function with a target param
This function will destroy it's contract metadata and send its balance to the address param target

	await getBalance(await contract.address)
	'0'

To do that we are gonna:

1. deploy the exploit contract: https://rinkeby.etherscan.io/address/0xdfbcf3cec3b81deeb99e447815c16058f714c352
2. send eth to it: https://rinkeby.etherscan.io/tx/0x594a58be0ea7d579c03d84bf517bcf08b68b7722b13e597c9f2167f0fcce7d7d
3. call it auto destruction function with the target address as param: https://rinkeby.etherscan.io/tx/0x96bb6194063454c05d3d84bdd71403c46c264aab391f429cef52014ce451b0d3

Now if we check the instance balance: 0.0001

	await getBalance(await contract.address)
	'0.0001'

## Level completed!

In solidity, for a contract to be able to receive ether, the fallback function must be marked payable.

However, there is no way to stop an attacker from sending ether to a contract by self destroying. Hence, it is important not to count on the invariant address(this).balance == 0 for any contract logic.