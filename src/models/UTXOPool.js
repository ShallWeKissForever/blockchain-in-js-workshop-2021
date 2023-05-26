import UTXO from './UTXO.js'

class UTXOPool {
  constructor() {
    this.utxos = {}
    /*
      {
        miner{
          {

          }
        }
      }
    */
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(UTXO) {
      //utxo=null
      this.utxos[UTXO.miner][UTXO.txId]=UTXO
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return Object.assign({},this.utxos)
  }
  
  //将当前的utxoPool制作快照
  snapshot() {
    return Object.values(this.utxos).filter((utxo) => !utxo[utxo.miner].isSpent());
  }

  // 继承父区块 UTXO 池状态的方法
  inherit(snapshot) {
    if (snapshot) {
      for (let utxo of Object.values(snapshot)) {
        this.utxos[utxo.miner] = utxo;
      }
    }
  }
  
  //将utxoPool回滚到上个快照
  rollback(prevSnapshot) {
    for (let utxo in this.utxos) {
      if (!prevSnapshot.includes(utxo)) {
        delete this.utxos[utxo.txId];
      }
    }
  }
  
  //更新utxoPool
   commit(snapshot) {
    for (let utxo in this.utxos) {
      if (!snapshot.includes(utxo)) {
        delete this.utxos[utxo.txId];
      }
    }
  }

  //获取utxoPool的快照
  getUtxoPoolSnapshot() {
    return Object.assign({}, this.utxos);
  }

  //计算该矿工地址的utxo总和
  // caclAmount(){
  //   let amount = 0
  //   for(let tempUtxo of Object.values(this.utxos)){
  //     //如果utxo的地址和矿工地址一样就累加上去
  //     //如何获取到当前访问的utxos的矿工地址？
  //     if(tempUtxo.address==){

  //     }
  //   }
  // }
  
}

export default UTXOPool
