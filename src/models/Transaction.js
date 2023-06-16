import sha256 from 'crypto-js/sha256.js'
import { sign, verifySignature } from '../crypto.js'


class Transaction {
  constructor(inputPublicKey, outputPublicKey, amount, fee, trxSignature) {
    this.inputPublicKey = inputPublicKey
    this.outputPublicKey = outputPublicKey
    this.amount = amount
    this.fee = fee
    this.trxSignature = trxSignature
    this._setHash()
  }

  // 更新交易 hash
  _setHash() {
    this.hash = this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(this.inputPublicKey + this.outputPublicKey + this.amount + this.fee).toString()
  }

  // 校验交易签名 返回 bool 类型的值
  hasValidSignature() {
    return verifySignature(this.hash, this.trxSignature, this.inputPublicKey)
  }
  
}

export default Transaction