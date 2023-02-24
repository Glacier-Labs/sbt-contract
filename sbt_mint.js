const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const csv_parse = require('csv-parse/lib/sync');
const SBT = require('./abi/SBT.json');

const CSV_AIRDROP = path.join(__dirname, './', 'airdrop.csv');
const POLYGON_TEST_RPC_URL = "https://matic-mumbai.chainstacklabs.com"
const POLYGON_RPC_URL = "https://polygon.llamarpc.com"
var web3 = new Web3(new Web3.providers.HttpProvider(POLYGON_RPC_URL));
var utils = web3.utils;
var eth = web3.eth;

// gas
const gas_limit = '200000'; //39000
// Contract owner
const my_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4";
const privateKey = "0xa6294cbff2ccd7c9515f13d746705635fe1fbd2197cfacc00a8375a11daf93b1"
const sbt_addr = '0x51fBa95412769A18281baa45D79031d29B856526'

const sbt_con = new eth.Contract(SBT.abi, sbt_addr);

async function mint() {
    //Mint Token params
    const token_opr = '0x0603f21fA9ac664Ae0bBE3C52EbA5888137f7233'
    const token_id = 2

    var abidata = sbt_con.methods.safeMint(token_opr, token_id).encodeABI();
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
        .catch(err => {
            console.log('err: ' + err.message);
        });
    console.log("receipt: ", receipt);

}

async function mints(accounts) {
    let tokenId = 1
    for (const addr of accounts) {
        var abidata = sbt_con.methods.safeMint(addr, tokenId).encodeABI();
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
            .catch(err => {
                console.log('err: ' + err.message);
            });
        console.log("receipt: ", receipt);
        console.log(`addr: ${addr}, tokenId: ${tokenId}`);

        if (!receipt || !receipt.status) {
            console.log(`err break`);
            break;
        }
        
        tokenId += 1;
    }
    
}

async function main() {
    let fileContent;
    if (!fs.existsSync(CSV_AIRDROP)) {
        console.log(`${CSV_AIRDROP} missing.`);
        return;
    } else {
        fileContent = await fs.readFileSync(CSV_AIRDROP, 'utf8');
    }

    let accounts = [];
    const records = csv_parse(fileContent, { columns: false });
    console.log(`${records.length}`)
    for (let entry of records) {
        let addr = entry[0]
        if (utils.isAddress(addr)) {
            //console.log(`${addr}`)
            accounts.push(addr)
        } else {
            //console.log('Invalid Address:', addr)
        }
    }

    //await mint();
    await mints(accounts);
}


main().catch(console.error).finally(() => process.exit());




