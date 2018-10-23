const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
// this deletes the folder and everything inside of it in the path
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'StakShift.sol');
const source = fs.readFileSync(contractPath, 'utf8');
