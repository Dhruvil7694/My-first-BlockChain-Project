const assert = require("assert"); // assert module is used to making assertion about tests. So we assert that some value is equal to another value.
const ganache = require("ganache-cli");// Ganache module will serve as a Local test etherum network.
const { beforeEach, it } = require('mocha');
const Web3 = require("web3");// W is in upper case because we are exporting it as a constructor in our project.
const web3 = new Web3(ganache.provider());// here 'web3' is a instance of a Web3 constructor, it provides a provider to communicate the web3 to local etherum network.
const { interface, bytecode } = require("../compile");
//Here interface is a translation layer that communicates the data from the network over to the javascript 
//Bytecode is compiled contract

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those account to deploy the contract.
  //making a new variable as inbox to test a new contract we are making.
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode.bytecode.Object,
      arguments: ["Hi there!"],
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    //console.log(Accounts); //to prints test accounts.
    //console.log(inbox); // running a test network we have made.
    assert.ok(inbox.options.address);//asser funcation named ok() with the inbox and using to get address of the inbox variable.
  });

  //verifying the message bye calling the initial message of inbox.sol
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  // updating the message using setmessage function of inbox.sol and displaying it usinf upper block of code.
  it('can change message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    // send() is used to send the transaction at the backend and from who is the sender,
    // we have specify the first account fetch from ganacheform line 13.
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
