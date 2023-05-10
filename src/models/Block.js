class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

    // 构造方法
    */
  constructor(blockchain, previousHash,height,hash) {
      //属于哪条链
      this.blockChain=blockchain;
      // 父区块的哈希值
      this.previousHash = previousHash;
      //当且区块的高度
      this.height=height;
      // 当前区块的哈希值
      this.hash = hash;
      // 此区块的nonce值，用于工作量证明算法的计算
      this.nonce = 0;
      //此区块储存的数据的默克尔树根
      this.merkleRoot='';
    }
}

export default Block
