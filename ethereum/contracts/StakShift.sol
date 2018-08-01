pragma solidity ^0.4.20;

contract StakeShift {
    address public buyer;
    address public seller;
    
    
    struct Agreement {
        string description;
        bool buyerApproved;
        bool sellerApproved;
        uint amount;
        bool isComplete;
        
    }

    Agreement currentContract;
    
    function releaseFunds() public {
        require(currentContract.buyerApproved && currentContract.sellerApproved);
        seller.transfer(currentContract.amount);
    }
    
    function approve(address approver) public {
        require(approver == buyer || approver == seller);
        
        if(approver == buyer) {
            currentContract.buyerApproved = true;
        } 
        
        currentContract.sellerApproved = true;
        
    }
    
    function createAgreement(string description, uint amount) public {
        currentContract = Agreement({
            description: description,
            buyerApproved: false,
            sellerApproved: false,
            amount: amount,
            isComplete: false
        });
        
 
    
    }
   function showAgreement() public view returns(string) {
        return currentContract.description;
        
    }        
}    