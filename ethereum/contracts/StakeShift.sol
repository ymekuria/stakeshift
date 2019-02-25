pragma solidity ^0.4.22;

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

    function buyerApprove() public {
        require(
            msg.sender == agreements[msg.sender].buyer,
            "Only the buyer is authorized to approve"
        );

        agreements[msg.sender].buyerApproved = true;    
    }

    function sellerApprove(address buyer) public {
        require(
            msg.sender == agreements[buyer].seller,
            "Only the seller is authorized to approve"
        );

        agreements[buyer].sellerApproved = true;
    }

    function cancelAgreement(address buyer) public {
        require(
            msg.sender == agreements[buyer].buyer || msg.sender == agreements[buyer].seller,
            "Only buyer or seller can cancel transaction"
            ); 
            
        delete(agreements[buyer]);
    }

    function completeAgreement(address buyer) public {
        require(
            agreements[buyer].sellerApproved && agreements[buyer].buyerApproved,
            "Both buyer and seller have to approve"
        );

        agreements[buyer].seller.transfer(address(this).balance);
        
        agreements[buyer].isComplete = true;
    }
}