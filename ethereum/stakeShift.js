import web3 from './web3';
import StakeShift from './build/StakeShift.json';

// creates a contract instance to work with in the client
export default address => {
  return new web3.eth.Contract(JSON.parse(StakeShift.interface), address);
};
