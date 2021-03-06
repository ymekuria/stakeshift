pragma solidity ^0.4.22;

contract StakeShift {
    struct Agreement {
        string description;
        address buyer;
        address seller;
        uint256 amount;
        bool buyerApprove;
        bool sellerApprove;
        bool buyerCancel;
        bool sellerCancel;
        bool isComplete;
    }

    mapping(address => Agreement) public agreements;

    function createAgreement(string agreementDescription, address currentSeller)
        public
        payable
    {
        Agreement memory newAgreement = Agreement({
            description: agreementDescription,
            buyer: msg.sender,
            seller: currentSeller,
            amount: msg.value,
            buyerApprove: false,
            sellerApprove: false,
            buyerCancel: false,
            sellerCancel: false,
            isComplete: false
        });

        agreements[msg.sender] = newAgreement;

    }

    function buyerApprove() public {
        require(
            msg.sender == agreements[msg.sender].buyer,
            "Only the buyer is authorized to approve"
        );

        agreements[msg.sender].buyerApprove = true;
    }

    function sellerApprove(address buyer) public {
        require(
            msg.sender == agreements[buyer].seller,
            "Only the seller is authorized to approve"
        );

        agreements[buyer].sellerApprove = true;
    }

    function buyerCancel() public {
        require(
            msg.sender == agreements[msg.sender].buyer,
            "Must be buyer to cancel"
        );

        agreements[msg.sender].buyerCancel = true;
    }

    function sellerCancel(address buyer) public {
        require(
            msg.sender == agreements[buyer].seller,
            "Must be seller to cancel"
        );

        agreements[buyer].sellerCancel = true;
    }

    function cancelAgreement(address buyer) public {
        require(
            msg.sender == agreements[buyer].buyer ||
                msg.sender == agreements[buyer].seller,
            "Only buyer or seller can cancel transaction"
        );

        require(
            agreements[buyer].buyerCancel == true &&
                agreements[buyer].sellerCancel == true,
            "Both buyer and seller must approve cancel"
        );

        // return eth to buyer
        agreements[buyer].buyer.transfer(address(this).balance);

        delete (agreements[buyer]);
    }

    function completeAgreement(address buyer) public {
        require(
            agreements[buyer].sellerApprove && agreements[buyer].buyerApprove,
            "Both buyer and seller have to approve"
        );

        agreements[buyer].seller.transfer(address(this).balance);

        agreements[buyer].isComplete = true;
    }
}
