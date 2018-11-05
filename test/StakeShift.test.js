assert = require('assert');
ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compliedContract = require('../ethereum/build/StakeShift.json');

let accounts;
let buyer;
let seller;
let stakeShift;
const contractJSONInterface = JSON.parse(compliedContract.interface);

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  buyer = accounts[0];
  seller = accounts[1];

  // deploying the contract to a ganache local test network
  stakeShift = await new web3.eth.Contract(contractJSONInterface)
    .deploy({ data: compliedContract.bytecode })
    .send({ from: accounts[0], gas: '2000000' });

  // create a test agreement
  await stakeShift.methods.createAgreement('Yoni test', seller).send({
    from: buyer,
    gas: '1000000'
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
    assert.equal(agreement.buyerApproved, false);

    // approve from buyers address
    await stakeShift.methods.buyerApprove().send({
      from: buyer,
      gas: '1000000'
    });

    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApproved, true);
  });

  it('seller cannot toggle buyerApproved boolean', async () => {
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApproved, false);

    // try toggle buyerApproved bolean from seller address
    try {
      await stakeShift.methods.buyerApprove().send({
        from: seller,
        gas: '1000000'
      });
      // if transaction goes through fail test
      assert(false);
    } catch (error) {
      console.log('error', error.message);
    }

    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.buyerApproved, false);
  });

  it('seller can approve transaction from their address', async () => {
    assert.equal(agreement.sellerApproved, false);

    // approve from buyers address
    await stakeShift.methods.sellerApprove(buyer).send({
      from: seller,
      gas: '1000000'
    });

    // check agreement after sellerApprove function call
    agreement = await stakeShift.methods.agreements(buyer).call();
    assert.equal(agreement.sellerApproved, true);
  });
});
