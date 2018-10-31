const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { mnemonic, nodeEndpoint } = require('../config/keys');

const compiledContract = require('./build/StakeShift.json');

const provider = new HDWalletProvider(mnemonic, nodeEndpoint);

console.log('mnemonic:', mnemonic, 'nodeEndpoint: ', nodeEndpoint);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const contractInstance = await new web3.eth.Contract(
      JSON.parse(compiledContract.interface)
    )

      .deploy({ data: '0x' + compiledContract.bytecode })
      .send({
        from: accounts[0]
      });
    console.log('Contract deployed to', contractInstance.options.address);
  } catch (error) {
    console.log(error);
  }
};

deploy();
