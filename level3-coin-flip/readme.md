## SOLUTION
# Links
https://www.quicknode.com/guides/solidity/how-to-call-another-smart-contract-from-your-solidity-code
Target: https://rinkeby.etherscan.io/address/0xa6A09E57C3f378478e8272635e4C1EB203A883Ea
Exploit: https://rinkeby.etherscan.io/address/0x0c90952464d97c46d18247270c7322a918f06513

Deploy exploit.sol to the rinkeby network
Call the function setTargetAddr with the smart contrat address from the level3
This will create a link/interface from the sm we just deployed and the target
Now we just need to call the function flipExploit
This function will find right flip side and send it to the flip function from our target
Repeat x10
You can check to target's variable {{consecutiveWins}} to verify

## Coin Flip
## Level completed!
Difficulty 3/10

Generating random numbers in solidity can be tricky. There currently isn't a native way to generate them, and everything you use in smart contracts is publicly visible, including the local variables and state variables marked as private. Miners also have control over things like blockhashes, timestamps, and whether to include certain transactions - which allows them to bias these values in their favor.

To get cryptographically proven random numbers, you can use Chainlink VRF, which uses an oracle, the LINK token, and an on-chain contract to verify that the number is truly random.

Some other options include using Bitcoin block headers (verified through BTC Relay), RANDAO, or Oraclize).