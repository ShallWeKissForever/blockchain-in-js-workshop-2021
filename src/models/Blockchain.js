// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    // 区块链的名字
    this.name = name;
    //创世区块
    this.genesis=''
    // 用于存储所有区块的映射
    this.blocks = {};
  }
    // 2. 定义 longestChain 函数
    /* 
      返回当前链中最长的区块信息列表
    */
    longestChain() {
      // 定义一个空数组保存最长的一条链。
      let chain=new Array();
      // 初始值设定为创世区块，表示链的起始。
      let longestBlock=this.genesis;
      // 遍历所有区块以找到最长的区块
      for(let tempBlock of Object.values(this.blocks)){
        if(longestBlock.height<tempBlock.height)longestBlock=tempBlock;
      }
      // 取得最长区块的哈希值
      let hash=longestBlock.hash;
      // 把当前区块加入链的起始位置，直到最长区块的哈希值是创世区块的哈希值为止
      while(hash!=this.genesis.hash){
        chain.unshift(this.blocks[hash]);
        hash=this.blocks[hash].previousHash;
      } 
      // 返回最长的一条链
      return chain;
        
    }
}

export default Blockchain
