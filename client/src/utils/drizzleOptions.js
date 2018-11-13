import { Drizzle, generateStore } from 'drizzle';
import StakeShift from './ethereum/stakeShift';
import { deployedAddress } from './config';

const stakeShift = StakeShift(deployedAddress);
const options = {
  contracts: [{ contractName: 'StakeShift', web3Contract: stakeShift }],
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  polls: {
    accounts: 3000
  },
  events: {}
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
export default drizzle;
