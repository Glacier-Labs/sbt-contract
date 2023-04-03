const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const csv_parse = require('csv-parse/lib/sync');
const SBT = require('./abi/SBT.json');

//const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
const RPC_URL = "https://polygon.llamarpc.com"
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
var utils = web3.utils;
var eth = web3.eth;

// gas
const gas_limit = '200000'; //39000
const gas_price = utils.toWei('125', 'gwei');
// user address
const my_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4"
const sbt_addr = '0xa2315a9d91dA9D572d14030A2252C5cf204f4330'
const sbt_con = new eth.Contract(SBT.abi, sbt_addr);

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function GetBalance(addr) {
  let val = await sbt_con.methods.balanceOf(addr).call().catch(console.error);
  console.log(val);
  return val
}

async function main() {
  await GetBalance(my_addr);

  await sleep(5000);

  // let val = await eth.getBalance(
  //   address,
  // );
  // let balance = utils.fromWei(val, 'ether');
  // console.log(`balance: ${balance}`);
}


main().catch(console.error).finally(() => process.exit());
