const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { mnemonic, nodeEndpoint } = require('../config/keys');

const provider = new HDWalletProvider(mnemonic, nodeEndpoint);
