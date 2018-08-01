pragma solidity ^0.4.20;

contract StakeShift {
    struct Agreement {
        string description;
        address buyer;
        address seller;
        uint amount;
        bool buyerApproved;
        bool sellerApproved;
        bool isComplete;
        
    }

    mapping(address => Agreement) public agreements; 
    
}