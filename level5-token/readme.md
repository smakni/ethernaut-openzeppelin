# SOLUTION
## Links

Target: 0xB4721dF9C5298B61E2454Ca26ab361d3CeF9dcB7

Here we are go exploit an underflow vulnerability in transfer

initalValue = 20 - 21 = 115792089237316195423570985008687907853269984665640564039457584007913129639915

After the trasnfer of 21 tokens we will have 115792089237316195423570985008687907853269984665640564039457584007913129639915 tokens

	await contract.balanceOf("0x6E81372783990a13715857888B32325621DB44E2")
		o {negative: 0, words: Array(11), length: 10, red: null}
		length: 10
		negative: 0
		red: null
		words: Array(11)
			0: 67108863
			1: 67108863
			2: 67108863
			3: 67108863
			4: 67108863
			5: 67108863
			6: 67108863
			7: 67108863
			8: 67108863
			9: 4194303
			length: 11
		[[Prototype]]: Array(0)
		[[Prototype]]: Object

## Level completed!
Difficulty 3/10

Overflows are very common in solidity and must be checked for with control statements such as:

if(a + c > a) {
  a = a + c;
}
An easier alternative is to use OpenZeppelin's SafeMath library that automatically checks for overflows in all the mathematical operators. The resulting code looks like this:

a = a.add(c);
If there is an overflow, the code will revert.