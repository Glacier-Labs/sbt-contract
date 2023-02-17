
var Tx = require('ethereumjs-tx');
var Web3 = require('web3');

//发起者，需要有私钥
const my_addr = "0xBC06E4830513078a1B0f276ca9bd5fCB09d2778A";
const privateKey = "0x371c5e48eac2992385ac9adfcf52fc17fe0e926dbc72302908f5bc0852869f32"
const to_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4"

//const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
const RPC_URL = "https://matic-mumbai.chainstacklabs.com"
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
var utils = web3.utils;
var eth = web3.eth;

const gas_limit = '40000'
const send_value = utils.toWei('0.19', 'ether');

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

