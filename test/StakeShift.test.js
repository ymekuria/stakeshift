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
});
