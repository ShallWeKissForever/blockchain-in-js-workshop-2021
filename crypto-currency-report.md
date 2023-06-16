# 数字货币技术理论课实验报告

## 小组成员

- 2021131064-王议 （组长）
- 2021131052-刘鹏
- 2021131063-朱奎镜
- 2021131065-谭弘琛
- 2021131066-彭崚
- 2021131082-母锏亓


## 代码仓库链接

https://github.com/ShallWeKissForever/blockchain-in-js-workshop-2021/edit/lesson1/crypto-currency-report.md


## 第一课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/50aa22b6ee9173f0974f23045e6f168b62b1ce56#diff-05fa4fb34523d79a4e144dccdd02b92e785e4023d3db51c8555b01917a454910

### 代码截图
https://pan.baidu.com/s/1CWr09WkRdu89lu0gQnFnZQ?pwd=zti9#list/path=%2F%E5%8A%A0%E5%AF%86%E8%B4%A7%E5%B8%81%E5%AE%9E%E9%AA%8C%E6%88%AA%E5%9B%BE%2FMerkleTree
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容

---



## 第二课代码


### 代码 commint 地址

https://github.com/ShallWeKissForever/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Trie.js

### 代码截图
> 将截图上传至网盘，放入链接即可
https://pan.baidu.com/s/1CWr09WkRdu89lu0gQnFnZQ?pwd=zti9#list/path=%2F%E5%8A%A0%E5%AF%86%E8%B4%A7%E5%B8%81%E5%AE%9E%E9%AA%8C%E6%88%AA%E5%9B%BE%2FTrie&parentPath=%2F
![](链接)


### 主观与讨论题内容

  
---


## 第三课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/50aa22b6ee9173f0974f23045e6f168b62b1ce56#diff-533b4b584c112260c48e9c6a04487f8649b82ef9e0e777a5745f24afcb7e6aa5

### 代码截图
https://pan.baidu.com/s/1CWr09WkRdu89lu0gQnFnZQ?pwd=zti9#list/path=%2F%E5%8A%A0%E5%AF%86%E8%B4%A7%E5%B8%81%E5%AE%9E%E9%AA%8C%E6%88%AA%E5%9B%BE%2FMPT&parentPath=%2F
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容
**1. 基于字典树, 以太坊做了哪些改良, 为什么？**

由于原始的字典树随着规模增加，访问复杂度变得很高，空间复杂度也非常高。针对这个问题，以太坊对字典树做了改良，提升了效率和性能。

  1. 更高效的存储：以太坊使用 byte array 代替之前的 String 形式存储，大大降低了存储空间和消耗的时间。
  2. Trie 树优化：以太坊存储状态时使用了 Merkle Patricia Tree (MPT)，使状态树高度只有64个，访问叶节点所需要的时间复杂度也降为O(log n)。同时，被证明MPT可以提供类似于哈希表的常量时间操作。
  3. 存储并发：以太坊允许多个交易同时进入区块，使用多路 Trie 求并集来解决并发访问问题。

**2. MPT 想要解决的核⼼问题是什么？**

  MPT想要解决的核心问题是在以太坊中存储大量数据时需要较高的存储成本和时间复杂度。MPT还有助于提高以太坊的可扩展性，从而支持更多的交易和更大的区块链数据。MPT能够在O(log n)时间内查询任意Key的Value，并且支持快速、安全的并发访问。 MPT还使得以太坊轻松实现存储证明（SPV）等协议，增加可扩展性并提高整个系统的效率。


---
