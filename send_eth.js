
var Tx = require('ethereumjs-tx');
var Web3 = require('web3');

//发起者，需要有私钥
const my_addr = "0xF137A872E438fc550745005646ADD965D47D2cF3";
const privateKey = "0xca0c633ca5e49731e2788f6e867587b88580e91b00bead3efb09bcb8bb56d738"
const to_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4"

var web3 = new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/bsc/testnet/public"));
var utils = web3.utils;
var eth = web3.eth;

const gas_limit = '60000'
const gas_price = '10.0' //gwei
const send_value = utils.toWei('0.48', 'ether');

async function main () {
    await SendValue(to_addr, send_value);
}

async function SendValue (addr, value) {
    var rawTx = {
        from: my_addr,
        to: addr,
        value: value,
        gas: gas_limit,
    };

    //签名交易数据
    var tx = await eth.accounts.signTransaction(
        rawTx,
        privateKey
    );
    //console.log(tx);

    //将交易数据发送到ETH网络
    const receipt = await eth.sendSignedTransaction(tx.rawTransaction)
        .catch(err => console.log('err: '+err.message));
    console.log(receipt);
    

}

main().catch(console.error).finally(() => process.exit());

