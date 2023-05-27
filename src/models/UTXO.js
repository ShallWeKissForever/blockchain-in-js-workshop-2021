export default class UTXO {

  constructor(txId,address,height) {
    //针对创币交易来设计
    //输入：无，因为是创币交易
    //输出：矿工地址，比特币数量
    //交易ID
    this.txId = txId
    //引用的交易地址：0
    this.prevTxHash = ''
    //收款地址
    this.address = address
    //交易金额
    this.value = 12.5
    //是否被花费
    this.spent = false
    //出自哪个区块
    this.height = height
    //金额
    this.amount = 0
  }

  // isSpent() {
  //   if (this.spent&&this.spent==true) {
  //     // 如果 utxo 存在，并且其 isSpent 标识为 true，则表示该 UTXO 已被花费
  //     return true;
  //   } else {
  //     // 否则表示该 UTXO 未被花费
  //     return false;
  //   }
  // }

}
