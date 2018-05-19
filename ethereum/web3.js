import Web3 from 'web3';

let web3;

// this checks to see if the code is running in the browser
// and if the user is using metamask
if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  // if we are both in the browser and using metamask, use the injected
  // metamask provider for this instance of web3
  web3 = new Web3(window.web3.currentProvider);
} else {
  // use infura to create a new provider if we are on the server or the user doesn't
  // jave metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/fYArXFXfUdkoisYsJ7uZ'
  );

  web3 = new Web3(provider);
}
