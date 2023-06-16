import UTXO from './UTXO.js'

class UTXOPool {
  constructor() {
    this.utxos = {}
  }

  addUTXO(utxo) {
    this.utxos[utxo.txId]=utxo
  }

  deleteUTXO(utxo){
    delete this.utxos[utxo.txId]
  }

  clone() {
    return Object.assign({},this.utxos)
  }

  // 继承父区块 UTXO 池状态的方法
  inherit(snapshot) {
    for (let utxo of Object.values(snapshot)) {
      this.utxos[utxo.txId] = utxo;
    }
}

  //将utxoPool回滚到上个快照
  // rollback(prevSnapshot) {
  //   for (let utxo in this.utxos) {
  //     if (!prevSnapshot.includes(utxo)) {
  //       delete this.utxos[utxo.txId];
  //     }
  //   }
  // }

  // //更新utxoPool
  //  commit(snapshot) {
  //   for (let utxo in this.utxos) {
  //     if (!snapshot.includes(utxo)) {
  //       delete this.utxos[utxo.txId];
  //     }
  //   }
  // }

  //获取utxoPool的快照
  getUtxoPoolSnapshot() {
    return Object.assign({}, this.utxos);
  }

  // //将当前的utxoPool制作快照
  // snapshot() {
  //   return Object.values(this.utxos).filter((utxo) => !utxo.isSpent());
  // }

  //如果这个输入/输出者没有账号则创造一个账户utxo
  createUtxo(outputPublicKey,inputPublicKey){
    let accountState = false
    for(let tempUtxo of Object.values(this.utxos)){
      if (tempUtxo.txId == outputPublicKey) {
        accountState = true
        break
      }
    }
    if (accountState==false) {
      let accountUtxo = new UTXO(outputPublicKey,outputPublicKey,null,null)
      this.addUTXO(accountUtxo)
    }
  }

  // 处理交易函数
  handleTransaction(tx) {

    //如果该账户不存在则创建outputPublicKeyd的utxo账户
    this.createUtxo(tx.outputPublicKey,tx.inputPublicKey)
    //减少inputPublicKey的余额
    this.utxos[tx.inputPublicKey].amount -= tx.amount
    this.utxos[tx.inputPublicKey].amount -= tx.fee
    //增加outputPublicKey的余额
    this.utxos[tx.outputPublicKey].amount += tx.amount
  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction(tx) {

    if(this.utxos[tx.inputPublicKey].amount >= tx.amount){
      return true
    }else{
      return false
    }

  }
}

export default UTXOPool