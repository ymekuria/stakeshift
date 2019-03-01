assert = require('assert');
ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compliedContract = require('../ethereum/build/StakeShift.json');

let accounts;
let buyer;
let seller;
let amount;
let stakeShift;
const contractJSONInterface = JSON.parse(compliedContract.interface);

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  buyer = accounts[0];
  seller = accounts[1];
  amount = '5000000000000000000';

  // deploying the contract to a ganache local test network
  stakeShift = await new web3.eth.Contract(contractJSONInterface)
    .deploy({ data: compliedContract.bytecode })
    .send({ from: buyer, gas: '2000000' });

  // create a test agreement
  await stakeShift.methods.createAgreement('Yoni test', seller).send({
    from: buyer,
    gas: '1000000',
    value: amount
  });
});

describe('StakeShift', () => {
  it('deploys a contract', () => {
    console.log('Stake Shift', stakeShift.options.address);
    assert.ok(stakeShift.options.address);
  });

  it('can create an agreement', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal('Yoni test', agreement.description);
  });

  it('buyer can approve transaction from their address', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();

    assert.equal(agreement.buyerApprove, false);

    // approve from buyers address
    await stakeShift.methods.buyerApprove().send({
      from: buyer,
      gas: '1000000'
    });

    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApprove, true);
  });

  it('seller cannot toggle buyerApprove boolean', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApprove, false);

    // try toggle buyerApprove bolean from seller address
    try {
      await stakeShift.methods.buyerApprove().send({
        from: seller,
        gas: '1000000'
      });
      // if transaction goes through fail test
      assert(false);
    } catch (error) {
      console.log(error.message);
    }

    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApprove, false);
  });

  it('seller can approve transaction from their address', async () => {
    assert.equal(agreement.sellerApprove, false);

    // approve from buyers address
    await stakeShift.methods.sellerApprove(buyer).send({
      from: seller,
      gas: '1000000'
    });

    // check agreement after sellerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.sellerApprove, true);
  });

  it('buyer cannot toggle sellerApprove boolean', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.sellerApprove, false);

    // try toggle buyerApprove bolean from buyer address
    try {
      await stakeShift.methods.sellerApprove(buyer).send({
        from: buyer,
        gas: '1000000'
      });
      // if transaction goes through fail test
      assert(false);
    } catch (error) {
      console.log('in catch');
      console.log(error.message);
    }

    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.sellerApprove, false);
  });

  it('cannot complete an agreement without buyer and seller approval', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApprove, false);

    try {
      await stakeShift.methods.completeAgreement(buyer).send({
        from: buyer,
        gas: '1000000'
      });
    } catch (error) {
      console.log(error.message);
    }
    assert.equal(agreement.isComplete, false);
  });

  it('buyer can approve agreement cancel', async () => {
    await stakeShift.methods.buyerCancel().send({
      from: buyer,
      gas: '1000000'
    });

    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerCancel, true);
  });

  it('seller can approve agreement cancel', async () => {
    await stakeShift.methods.sellerCancel(buyer).send({
      from: seller,
      gas: '1000000'
    });

    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.sellerCancel, true);
  });

  it('can cancel agreement', async () => {
    assert.equal(false, true);
  });

  it('can complete an agreement with buyer and seller approval', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.isComplete, false);

    try {
      await stakeShift.methods.buyerApprove().send({
        from: buyer,
        gas: '1000000'
      });

      await stakeShift.methods.sellerApprove(buyer).send({
        from: seller,
        gas: '1000000'
      });

      await stakeShift.methods.completeAgreement(buyer).send({
        from: seller,
        gas: '1000000'
      });
    } catch (error) {
      console.log(error.message);
    }
    agreement = await stakeShift.methods.agreements(buyer).call();

    assert.equal(agreement.isComplete, true);

    // check if contract balance is transfered to the seller
    let sellerBalance = await web3.eth.getBalance(seller);
    sellerBalance = await web3.utils.fromWei(sellerBalance, 'ether');
    console.log('sellerBalance ', sellerBalance);
    assert(parseFloat(sellerBalance) > 104);
  });

  // xit('buyer can delete an agreement', async () => {
  //   agreement = await stakeShift.methods.agreements(buyer).call();
  //   console.log(agreement);
  //   await stakeShift.methods.cancelAgreement(buyer).send({
  //     from: buyer,
  //     gas: '1000000'
  //   });
  //   const deletedAgreement = await stakeShift.methods.agreements(buyer).call();
  //   console.log('deleted agreement', deletedAgreement);
  //   assert.notEqual(agreement.description, deletedAgreement.description);
  //   assert.notEqual(agreement.buyer, deletedAgreement.buyer);
  //   assert.equal(deletedAgreement.description, 0);
  // });
});
