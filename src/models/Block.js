import sha256 from 'crypto-js/sha256.js'
import UTXOPool from './UTXOPool.js'
import UTXO from './UTXO.js'
import SHA256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 3

class Block {
  // 1. 完成构造函数及其参数

  constructor(name,prevHash,height,hash,miner) {
    this.name=name
    this.prevHash=prevHash
    this.height=height
    this.hash=hash
    this.nonce=''
    this.caclTime=0
    this.caclTimes=0
    //交易池
    this.utxoPool = new UTXOPool()
    //挖出该区块的受益人的地址
    this.coinbaseBeneficiary=miner
  }

  isValid() {
     //创建一个符合难度值的0个数的字符串
     let difficulty = ''
     //创建符合难度值的0位用于检验
     for(let i=0;i<DIFFICULTY;i++){
       difficulty+='0'
     }
    //indexOf函数：如果nonce的开头`DIFFICULTY`位符合0,则返回0(意思是该字符串在第0位)
    if(this.nonce.indexOf(difficulty)==0){
      return true
    }else{
      return false
    }
  }

  setNonce(nonce) {
    this.nonce=nonce
  }

  //创币utxo
  coinBase(){
    //检验nonce是否符合难度值
    if (this.isValid()==true) {
      //创造一个创币utxo
      let coinBaseUTXO = new UTXO(sha256((new Date().getTime()+Math.random()).toString()).toString(),this.coinbaseBeneficiary,this.height)
      //把该utxo加入utxopool中
      this.utxoPool.addUTXO(coinBaseUTXO)
      this.createMinerUtxo()
      this.utxoPool.utxos[this.coinbaseBeneficiary].amount += 12.5
    }
  }

  //如果这个矿工没有账号则创造一个账户utxo
  createMinerUtxo(){
    let accountState = false
    for(let tempUtxo of Object.values(this.utxoPool.utxos)){
      if (tempUtxo.txId == this.coinbaseBeneficiary) {
        accountState = true
        break
      }
    }
    if (accountState==false) {
      let accountUtxo = new UTXO(this.coinbaseBeneficiary,this.coinbaseBeneficiary,null)
      this.utxoPool.addUTXO(accountUtxo)
    }
  }
}

export default Block
