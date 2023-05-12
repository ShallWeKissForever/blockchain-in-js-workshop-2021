import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(name,preHash,height,hash) {
    this.name=name
    this.preHash=preHash
    this.height=height
    this.hash=hash
    this.nonce=0
  }

  //验证nonce的前几个0的个数是否符合难度值
  isValid() {

  }

  setNonce(nonce) {
    this.nonce=nonce
  }
}

export default Block

