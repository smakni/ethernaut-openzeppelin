# SOLUTION
## Links
Target: https://rinkeby.etherscan.io/address/0x4E4942B4C9dAa87967127D67E08b42C6A9047eAa
Exploit: https://rinkeby.etherscan.io/address/0x096651737f15d92de9148db6fda91f128ece98e1

Here the goTo function of Elevator create a Building interface from the sender address
To exploit that and change the result of building.isLastFloor(_floor) we are gonna call the target from a "fake" Building contract that will have a "fake" isLastFloor function
The exeption is that we need to send 2 different value form it (true/false)

We attack with floor = 10

	await contract.floor()
	o {negative: 0, words: Array(2), length: 1, red: null}length: 1negative: 0red: nullwords: Array(2)0: 10length: 2[[Prototype]]: Array(0)[[Prototype]]: Object
	
	await contract.top()
	true



## Level completed!
Difficulty 4/10

You can use the view function modifier on an interface in order to prevent state modifications. The pure modifier also prevents functions from modifying the state. Make sure you read Solidity's documentation and learn its caveats.

An alternative way to solve this level is to build a view function which returns different results depends on input data but don't modify state, e.g. gasleft().
