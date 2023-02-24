const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction

//const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
const POLYGON_TEST_RPC_URL = "https://matic-mumbai.chainstacklabs.com"
const POLYGON_RPC_URL = "https://polygon.llamarpc.com"
var web3 = new Web3(new Web3.providers.HttpProvider(POLYGON_TEST_RPC_URL));
var utils = web3.utils;
var eth = web3.eth;


const address = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function main () {
	
    let val = await eth.getBalance(
        address,
    );
    
    let balance = utils.fromWei(val, 'ether');
	console.log(`balance: ${balance}`);
}


main().catch(console.error).finally(() => process.exit());
