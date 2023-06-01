const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletprovider(
    'Paste your Mnemonic Words',
    'Your test network link for example georli infura'
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
