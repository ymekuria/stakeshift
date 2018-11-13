const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
// this deletes the folder and everything inside of it in the path
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'StakeShift.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// const output = solc.compile(source, 1).contracts[':StakeShift'];
const output = solc.compile(source, 1).contracts[':StakeShift'];

// checks to see if directory exists. If not it creates it
fs.ensureDirSync(buildPath);

// outputJson creates a JSON file at the specified path and name
// TODO: allow dynamic file and name creaction when more contracts are added
fs.outputJsonSync(path.resolve(buildPath, 'StakeShift.json'), output);
