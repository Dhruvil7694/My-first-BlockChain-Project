const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletprovider(
    'crystal middle cross refuse derive lottery olympic can guide unlock copper raven',
    'https://goerli.infura.io/v3/6f6ccea1cda54c1ca7438851ae3d1a4e'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from the account: ', accounts[0]);

    const result = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode.bytecode.object , arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract is deployed to: ', result.options.address);
    provider.engine.stop();
};
deploy();