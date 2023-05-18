import Block, { DIFFICULTY } from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import sha256 from 'crypto-js/sha256.js'
import { calcNonce } from '../utils.js'

const main = () => {
  // 初始化区块链
  let blockchain = new Blockchain('BitCoin')

  // 创建创世区块
  let genesisBlock = new Block(blockchain, 'root', 0, 'root')

  // 设置创世区块
  blockchain.genesis = genesisBlock

  // 验证区块难度
  console.assert(DIFFICULTY > 0, 'Error: Need config DIFFICULTY on Block file')

  // 构建区块
  let newBlock = new Block(
    blockchain,
    genesisBlock.hash,
    1,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 验证区块难度合法性
  console.assert(newBlock.isValid() == false, 'Error: Very low probability')

  newBlock = calcNonce(newBlock)

  console.assert(newBlock.isValid() == true, 'Error: Very low probability')

  blockchain.blocks[newBlock.hash] = newBlock

  let nextBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256(new Date().getTime().toString()).toString(),
  )

  let nextCompetitionBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256(new Date().getTime().toString()).toString(),
  )

  nextBlock = calcNonce(nextBlock)
  nextCompetitionBlock = calcNonce(nextCompetitionBlock)
  // 添加两个区块高度为 2  的的竞争区块
  blockchain.blocks[nextBlock.hash] = nextBlock
  blockchain.blocks[nextCompetitionBlock.hash] = nextCompetitionBlock

  let longestChain = blockchain.longestChain()

  console.assert(longestChain.length == 2, 'Error: Block height should be 2')

  let thirdBlock = new Block(
    blockchain,
    nextCompetitionBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  
  thirdBlock = calcNonce(thirdBlock)

  blockchain.blocks[thirdBlock.hash] = thirdBlock

  longestChain = blockchain.longestChain()

  // 区块检查
  console.assert(longestChain.length == 3, 'Block height should be 2')
  console.assert(
    longestChain[2].hash == thirdBlock.hash,
    `Height block hash should be ${thirdBlock.hash}`,
  )

  //以下是创建第四到第十个区块

  let fourthBlock = new Block(
    blockchain,
    thirdBlock.hash,
    4,
    sha256(new Date().getTime().toString()).toString(),
  )
  fourthBlock = calcNonce(fourthBlock)
  blockchain.blocks[fourthBlock.hash] = fourthBlock

  let fifthBlock = new Block(
    blockchain,
    fourthBlock.hash,
    5,
    sha256(new Date().getTime().toString()).toString(),
  )
  fifthBlock = calcNonce(fifthBlock)
  blockchain.blocks[fifthBlock.hash] = fifthBlock

  let sixthBlock = new Block(
    blockchain,
    fifthBlock.hash,
    6,
    sha256(new Date().getTime().toString()).toString(),
  )
  sixthBlock = calcNonce(sixthBlock)
  blockchain.blocks[sixthBlock.hash] = sixthBlock

  let seventhBlock = new Block(
    blockchain,
    sixthBlock.hash,
    7,
    sha256(new Date().getTime().toString()).toString(),
  )
  seventhBlock = calcNonce(seventhBlock)
  blockchain.blocks[seventhBlock.hash] = seventhBlock

  let eighthBlock = new Block(
    blockchain,
    seventhBlock.hash,
    8,
    sha256(new Date().getTime().toString()).toString(),
  )
  eighthBlock = calcNonce(eighthBlock)
  blockchain.blocks[eighthBlock.hash] = eighthBlock

  let ninthBlock = new Block(
    blockchain,
    eighthBlock.hash,
    9,
    sha256(new Date().getTime().toString()).toString(),
  )
  ninthBlock = calcNonce(ninthBlock)
  blockchain.blocks[ninthBlock.hash] = ninthBlock

  let tenthBlock = new Block(
    blockchain,
    ninthBlock.hash,
    10,
    sha256(new Date().getTime().toString()).toString(),
  )
  tenthBlock = calcNonce(tenthBlock)
  blockchain.blocks[tenthBlock.hash] = tenthBlock

  //以上是创建第四到第十个区块

  //把新创建的区块添加到最长链上
  longestChain = blockchain.longestChain()
  //储存计算花费的平均时间
  let allConsumedTime = 0
  //储存计算花费的平均次数
  let allConsumedTimes = 0
  //计算平均时间和平均次数
  for(let block of Object.values(longestChain)){
    allConsumedTime += block.caclTime
    allConsumedTimes += block.caclTimes
  }
  
  console.log(`calc nonce of ${longestChain.length} blocks, 
  average cost ${allConsumedTime / longestChain.length}s, 
  average try ${allConsumedTimes / longestChain.length} times`);
}

main()
