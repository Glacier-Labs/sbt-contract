const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const SBT = require('./abi/SBT.json');

//const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
const RPC_URL = "https://matic-mumbai.chainstacklabs.com"
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
var utils = web3.utils;
var eth = web3.eth;

// gas
const gas_limit = '1000000'; //39000
// Contract owner
const my_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4";
const privateKey = "0xa6294cbff2ccd7c9515f13d746705635fe1fbd2197cfacc00a8375a11daf93b1"
const sbt_addr = '0xE0658409E15D20EE07A515F5137F398cdb41F018'

//Mint Token params
const token_opr = '0xF137A872E438fc550745005646ADD965D47D2cF3'
const token_id = 2

const sbt_con = new eth.Contract(SBT.abi, sbt_addr);
var abidata = sbt_con.methods.safeMint(token_opr, token_id).encodeABI();

async function main() {

    var rawTx = {
        from: my_addr,
        to: sbt_addr,
        gas: gas_limit,
        value: '0x00',
        data: abidata,
    };

    //签名交易数据
    var tx = await eth.accounts.signTransaction(
        rawTx,
        privateKey
    );
    //console.log(tx);

    //将TX数据发送到ETH网络
    const receipt = await eth.sendSignedTransaction(tx.rawTransaction)
        .catch(err => console.log('err: ' + err.message));
    console.log(receipt);
}


main().catch(console.error).finally(() => process.exit());




