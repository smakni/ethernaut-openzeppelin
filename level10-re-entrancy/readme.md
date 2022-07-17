# SOLUTION
## Links
Target: https://rinkeby.etherscan.io/address/0x6A13291b886549DA1D12049F5f2E77D203B5ec5d
Exploit: https://rinkeby.etherscan.io/address/0x7748447584c671a0ec6e0088e317224db38b1f0c

We are gonna exploit a re-entrancy vulnerability (solidity ^0.6.0) in the withdraw function
In fact the msg.sender.call{value:_amount}("");
Is called before our balance update and with no protection
So we can call this until thew target balance is not empty with an exploit smart contrat's fallbakc function
It will call again and again the withdraw function without updating our balance

So for this exploti we are gonna:

	1. send 0.001 eth
	2. withdraw it -> call our fallback
	3. repeat withdraw
	end. target update our balance to 0

## Level completed!

In order to prevent re-entrancy attacks when moving funds out of your contract, use the Checks-Effects-Interactions pattern being aware that call will only return false without interrupting the execution flow. Solutions such as ReentrancyGuard or PullPayment can also be used.

transfer and send are no longer recommended solutions as they can potentially break contracts after the Istanbul hard fork Source 1 Source 2.

Always assume that the receiver of the funds you are sending can be another contract, not just a regular address. Hence, it can execute code in its payable fallback method and re-enter your contract, possibly messing up your state/logic.

Re-entrancy is a common attack. You should always be prepared for it!

 

The DAO Hack
The famous DAO hack used reentrancy to extract a huge amount of ether from the victim contract. See 15 lines of code that could have prevented TheDAO Hack.

