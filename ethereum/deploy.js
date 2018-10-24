const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { mnemonic, nodeEndpoint } = require('../config/keys');

// const provider = new HDWalletProvider(mnemonic, nodeEndpoint);
const compiledContract = require('./build/StakeShift.json');

console.log('compiledContract: ', compiledContract.bytecode);
const provider = new HDWalletProvider(mnemonic, nodeEndpoint);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const contractInstance = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface)
  )

    .deploy({ data: compiledContract.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', contractInstance.options.address);
};

deploy();