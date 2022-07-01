# SOLUTION
## Links
https://docs.soliditylang.org/en/v0.8.1/contracts.html?highlight=fallback%20function#fallback-function

Target: https://rinkeby.etherscan.io/address/0x2d11f930b29674ff2EF819823E94c59f131ecD8B

Exploit: https://rinkeby.etherscan.io/address/0x0884e16e9e8479a46463a6f2fb444a711219ad47

Here we need to call the fallback function to become king throw the fallback lock it from the owner
To do that we are gonna pass throw a smart contrat that will become king by paying the prize
But will not be abble to payback when the owner is gonna claim iut again
king.transfer(msg.value); this is where it's gonna be locked



To do that we are gonna:

0. First we need to get the actual prize amount: 1000000000000000 uint256 > 0.001 Ether
1. deploy the exploit contract: https://rinkeby.etherscan.io/tx/0x95f9849a6353ee4d7c149ffcf080d4150882d22cbad2a185de9708f048b72dc5
2. call the fonction exploitFallback param = target address, with value >= 0.001 eth to become king: https://rinkeby.etherscan.io/tx/0x33ebff623fe0c448a552c89b1e44024bd5f5d80278746d35117f82f27d7971bc

Check new king

	await contract._king()
	'0x0884e16E9e8479A46463A6f2FB444a711219ad47' > Our exploit contract

## Level completed!

Most of Ethernaut's levels try to expose (in an oversimplified form of course) something that actually happened — a real hack or a real bug.

In this case, see: King of the Ether and King of the Ether Postmortem.

https://www.kingoftheether.com/thrones/kingoftheether/index.html
http://www.kingoftheether.com/postmortem.html