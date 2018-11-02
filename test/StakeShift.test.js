assert = require('assert');
ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compliedContract = require('../ethereum/build/StakeShift.json');

let accounts;
let stakeShift;
const contractJSONInterface = JSON.parse(compliedContract.interface);

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploying the contract to a ganache local test network
  stakeShift = await new web3.eth.Contract(contractJSONInterface)
    .deploy({ data: compliedContract.bytecode })
    .send({ from: accounts[0], gas: '2000000' });
});

describe('StakeShift', () => {
  it('deploys a contract', () => {
    console.log('Stake Shift', stakeShift.options.address);
    assert.ok(stakeShift.options.address);
  });

  it('can create an agreement', async () => {
    const seller = accounts[1];
    await stakeShift.methods.createAgreement('Yoni test', seller).send({
      from: accounts[0],
      gas: '1000000'
    });

    const agreement = await stakeShift.methods.agreements(accounts[0]).call();
    assert.equal('Yoni test', agreement.description);
  });

  it('buyer can approve transaction', async () => {
    const buyer = accounts[0];
    const seller = accounts[1];

    await stakeShift.methods.createAgreement('Teddy test', seller).send({
      from: accounts[0],
      gas: '1000000'
    });
    let agreement = await stakeShift.methods.agreements(accounts[0]).call();
    // console.log('agreements: ', agreement.buyerApproved);
    assert.equal(agreement.buyerApproved, false);

    // approve from buyers address
    await stakeShift.methods.buyerApprove().send({
      from: buyer,
      gas: '1000000'
    });
    // check agreement after buyerApprove function call
    agreement = await stakeShift.methods.agreements(accounts[0]).call();
    assert.equal(agreement.buyerApproved, true);
  });
});
