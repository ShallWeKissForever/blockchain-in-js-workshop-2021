import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 3

class Block {
  // 1. 完成构造函数及其参数

  constructor(name,preHash,height,hash) {
    this.name=name
    this.preHash=preHash
    this.height=height
    this.hash=hash
    this.nonce=''
    //储存该区块花费的计算时长
    this.caclTime=0
    //储存该区块花费的计算次数
    this.caclTimes=0
  }

  //验证nonce的前几个0的个数是否符合难度值
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
}

export default Block

