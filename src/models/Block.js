import UTXOPool from './UTXOPool.js'
import UTXO from './UTXO.js'
import sha256 from 'crypto-js/sha256.js'
import MerkleTree from './MerkleTree.js'

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
    //默克尔树
    this.merkleTreeRoot = new MerkleTree([])
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
      let coinBaseUTXO = new UTXO(sha256((new Date().getTime()+Math.random()).toString()).toString(),this.coinbaseBeneficiary,null,this.height)
      //把该utxo加入utxopool中
      this.utxoPool.addUTXO(coinBaseUTXO)
      this.createMinerUtxo(this.coinbaseBeneficiary,this.coinbaseBeneficiary)
      this.utxoPool.utxos[this.coinbaseBeneficiary].amount += 12.5
    }
  }

  //如果这个矿工没有账号则创造一个账户utxo
  createMinerUtxo(txId,address){
    let accountState = false
    for(let tempUtxo of Object.values(this.utxoPool.utxos)){
      if (tempUtxo.txId == txId) {
        accountState = true
        break
      }
    }
    if (accountState==false) {
      let accountUtxo = new UTXO(txId,address,null,null)
      this.utxoPool.addUTXO(accountUtxo)
    }
  }

  // 根据交易变化更新区块 hash
  _setHash() {
    this.hash = sha256((this.hash+this.merkleTreeRoot).toString()).toString()
  }

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {
    return this.merkleTreeRoot.rootHash
  }

  // 添加交易到区块
  /**
   * 需包含 UTXOPool 的更新与 hash 的更新
   * UTXOPool 的更新：从UTXOPool中删除旧的满足这笔交易数额的utxo，添加新的零钱utxo
   *   hash   的更新：根据交易变化更新区块 hash
   */
  addTransaction(tx) {
    //遍历inputer拥有的满足这笔交易数额的utxo
    let inputUTXOId = ''
    for(let tempUtxo of Object.values(this.utxoPool.utxos)){
      if (tempUtxo.address==tx.inputPublicKey) {
        if (tempUtxo.values>=tx.amount) {
          inputUTXOId = tempUtxo.txId
        }
      }
    }
    //添加新的零钱utxo

    //从UTXOPool中删除utxo
    //this.utxoPool.deleteUTXO()
    //处理交易
    this.utxoPool.handleTransaction(tx)
    //根据交易变化更新区块 hash
    this.merkleTreeRoot.addElement(tx.hash)
    this._setHash()
  }

}

export default Block
