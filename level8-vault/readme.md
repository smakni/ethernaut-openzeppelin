# SOLUTION
## Links
https://jeancvllr.medium.com/solidity-tutorial-all-about-bytes-9d88fdb22676#:~:text=The%20fixed%20length%20bytes32%20can,not%20support%20variable%20length%20type.



Target: https://rinkeby.etherscan.io/address/0x8fc0639B07206720aAD901cD69E9A1E163c7a753

Exploit: script.js

Here in this constract the vault password is set in it's construct as a param
If the contract is verified we can find it in its creation code

	608060405234801561001057600080fd5b506040516101653803806101658339818101604052602081101561003357600080fd5b810190808051906020019092919050505060016000806101000a81548160ff021916908315150217905550806001819055505060f1806100746000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063cf309012146037578063ec9b5b3a146057575b600080fd5b603d6082565b604051808215151515815260200191505060405180910390f35b608060048036036020811015606b57600080fd5b81019080803590602001909291905050506094565b005b6000809054906101000a900460ff1681565b80600154141560b85760008060006101000a81548160ff0219169083151502179055505b5056fea264697066735822122089d8dcab0ee2a6e0d4b11a8b0624f50e782fb879a941ed2f1d39cad24fdf2b1c64736f6c63430006030033412076657279207374726f6e67207365637265742070617373776f7264203a29

As this param is the last one and its type is bytes32 we will find it within 64 char from the end of the creation code: 0x412076657279207374726f6e67207365637265742070617373776f7264203a29

If we convert it to ascii: A very strong secret password :)

now we just need to call the unlock function with the right param: 0x412076657279207374726f6e67207365637265742070617373776f7264203a29

https://rinkeby.etherscan.io/tx/0x8c29b13b96a2bf336bc557fafaaaf4d9c6f4de0a26eb3826e7046367ef2de363

	await contract.locked()
	false

## Level completed!

It's important to remember that marking a variable as private only prevents other contracts from accessing it. State variables marked as private and local variables are still publicly accessible.

To ensure that data is private, it needs to be encrypted before being put onto the blockchain. In this scenario, the decryption key should never be sent on-chain, as it will then be visible to anyone who looks for it. zk-SNARKs provide a way to determine whether someone possesses a secret parameter, without ever having to reveal the parameter.