
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet')
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC || "";
//const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
const RPC_URL = "https://matic-mumbai.chainstacklabs.com"
var web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
var utils = web3.utils;
var eth = web3.eth;

// Derive owner address
const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(MNEMONIC));
const xnode = hdwallet.derivePath("m/44'/60'/0'/0");
const my_addr = xnode.deriveChild(0).getWallet().getChecksumAddressString();
const privateKey = xnode.deriveChild(0).getWallet().getPrivateKeyString();

// To address
const to_addr = "0x94101cB45019002D2E6ca599bEACFfd1d47A31E4"

const gas_limit = '40000'
const send_value = utils.toWei('0.19', 'ether');

async function SendValue(addr, value) {
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
        .catch(err => console.log('err: ' + err.message));
    console.log(receipt);


}

async function main() {
    await SendValue(to_addr, send_value);
}

main().catch(console.error).finally(() => process.exit());

