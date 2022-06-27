# SOLUTION
## Links
exploit: https://rinkeby.etherscan.io/address/0xb99e64babfa435c84fad96101c6e1cc808380154
target: https://rinkeby.etherscan.io/address/0x2575a64c9d9dc7dfc51acd9ccd37ae0513c57802


Deploy exploit.sol to the rinkeby network
Call the function setTargetAddr with the target smart contrat address
This will create a link/interface from the sm we just deployed and the target
Now we just need to call the function changeOwnerExploit
This will create a transaction to the target with tx.origin != msg.sender (origin == exploit contract address)
And so pass the check to change the target sm owner

## Telephone
## Level completed!
Difficulty 1/10

While this example may be simple, confusing tx.origin with msg.sender can lead to phishing-style attacks, such as this.

An example of a possible attack is outlined below.

Use tx.origin to determine whose tokens to transfer, e.g.
function transfer(address _to, uint _value) {
  tokens[tx.origin] -= _value;
  tokens[_to] += _value;
}
Attacker gets victim to send funds to a malicious contract that calls the transfer function of the token contract, e.g.
function () payable {
  token.transfer(attackerAddress, 10000);
}
In this scenario, tx.origin will be the victim's address (while msg.sender will be the malicious contract's address), resulting in the funds being transferred from the victim to the attacker.