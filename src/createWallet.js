// Importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definir a rede
// rede principal bitcoin - mainnet
// rede de teste bitcoin - testnet
const network = bitcoin.networks.testnet

// Derivação de carteiras HD - hierarquical determinist
const path = `m/49'/1'/0'/0` // `m/49'/0'/0'/0` - mainnet


// Criar o mnemonic para a seed (palavras da senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criar eaiz da carteira HD
let root = bip32.fromSeed(seed, network)

// Criar uma conta - pvt-pub keys - chaves publicas e privadas
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereco: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)