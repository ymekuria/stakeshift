import { Drizzle, generateStore } from 'drizzle';
import StakeShift from './ethereum/stakeShift';
import { deployedAddress } from './config';

const stakeShift = StakeShift(deployedAddress);
const options = {
  contracts: [{ contractName: 'StakeShift', web3Contract: stakeShift }]
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;
