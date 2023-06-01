const path = require("path");//temperory variable for giving path
const fs = require("fs");// temperory variable for reading the content of a file
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");//for connecting the path to int inbox.sol file from compile.js file
const source = fs.readFileSync(inboxPath, "utf8");// to read the content of a file


const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
   
  module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox;