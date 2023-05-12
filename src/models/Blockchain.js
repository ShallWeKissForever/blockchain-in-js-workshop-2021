// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name=name
    this.genesis=''
    this.blocks={}
  }

  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let chain = {}
    let longestBlock = this.genesis
    for(let tempBlock of Object.values(this.blocks)){
      if(longestBlock.height<tempBlock.height){
        longestBlock=tempBlock
      }
    }

    let hash=longestBlock.hash
    while(hash!=this.genesis.hash){
      chain.unshift(this.blocks[hash])
      hash=this.blocks[hash].preHash
    }

    return chain
  }
}

export default Blockchain
