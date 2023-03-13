//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

contract Treasury {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function balance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
}
