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

    function createAgreement(string agreementDescription, address currentSeller ) public payable {
        
        Agreement memory newAgreement = Agreement({
            description: agreementDescription,
            buyer: msg.sender,
            seller: currentSeller,
            amount: msg.value,
            buyerApproved: false,
            sellerApproved: false,
            isComplete: false
        });
        
        agreements[msg.sender] = newAgreement;
    
    }    
    
}