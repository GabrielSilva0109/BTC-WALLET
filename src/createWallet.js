const  bip32 = require('bip32')
const  bip39 = require('bip39')
const  bitcoin = require('bitcoinjs-lib')

//Definir Rede
const network = bitcoin.networks.testnet

//Derivação Carteiras HD
const path = `m/49'/1'/0'/0`

//Criando o MNEMONIC para a seed 'PALAVRAS DE SENHA'
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//Criando uma conta - par pvt-pub-keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log('Wallet Created!')
console.log('Address: ', btcAddress)
console.log('PrivateKey: ', node.toWIF())
console.log('Seed: ', mnemonic)