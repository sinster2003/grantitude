// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bounty {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event BountyAwarded(address payable _repoContributor);
    
    // transfer funds from repoOwner to repoContributor
    function awardBounty(address payable _repoContributor) public payable {
        require(msg.value > 0, "Bounty has to greater than 0 ethers");
        require(msg.value <= msg.sender.balance, "Not enough balance present to award the bounty");
        (bool status, ) = _repoContributor.call{value: msg.value}("");
        require(status, "Transaction failed");
        emit BountyAwarded(_repoContributor);
    }
}