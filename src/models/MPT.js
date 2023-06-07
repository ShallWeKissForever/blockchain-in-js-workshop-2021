import digest from 'keccak256';

// 定义 MPT 类
class MPT {
  constructor() {
    this.root = null;
    this.nodes = {};
  }

  // 将地址转换为 MPT 索引格式
  getAddressIndex(address) {
    return Buffer.from(address.slice(2), 'hex');
  }

  // 获取节点
  getNode(index) {
    return this.nodes[index.toString('hex')];
  }

  // 添加或更新地址的函数
  addOrUpdateAddress(address, balance) {
    const index = this.getAddressIndex(address);
    let currentNode = this.root;

    // 如果根节点为空，初始化为一个空对象
    if (!this.root) {
      this.root = {};
      currentNode = this.root;
    }

    // 遍历 MPT 树
    for (let i = 0; i < index.length; i++) {
      const nibble = index[i] >> 4;
      const isLeaf = i === index.length - 1;
      const key = nibble.toString(16);

      // 如果当前节点不存在，创建一个新的节点
      if (!currentNode[key]) {
        currentNode[key] = isLeaf ? balance : {};
      }
      // 如果当前节点是叶子节点，直接更新余额
      else if (isLeaf) {
        currentNode[key] = balance;
      }

      currentNode = currentNode[key];
    }

    // 循环结束后，重新计算根节点哈希值，并更新节点缓存
    const newRoot = this.computeRoot();
    this.nodes[newRoot.toString('hex')] = this.root;
    this.root = this.nodes[newRoot.toString('hex')];
  }

  // 计算 MPT 根节点的哈希值
  computeRoot() {
    return digest(this.getEncoded(this.root));
  }

  // 获取节点编码后的数据
  getEncoded(node) {
    if (typeof node === 'string' || typeof node === 'number') {
      return Buffer.concat([
        Buffer.from([0x02]),
        Buffer.from(node.toString()),
      ]);
    } else if (typeof node === 'object') {
      const keys = Object.keys(node);
      if (keys.length === 0) {
        return Buffer.from([0x00]);
      } else if (keys.length === 16 && !keys.includes('l')) {
        const encodedArray = keys.map((key) => this.getEncoded(node[key]));
        return Buffer.concat([Buffer.from([0x03]), ...encodedArray]);
      } else {
        const encodedArray = keys.map((key) => {
          const encodedKey = Buffer.from(key, 'hex');
          const encodedValue = this.getEncoded(node[key]);
          return Buffer.concat([encodedKey, encodedValue]);
        });
        return Buffer.concat([Buffer.from([0x01]), ...encodedArray]);
      }
    } else {
      throw new Error('Invalid node type');
    }
  }

  // 验证 MPT 数据是否正确
  verify(address, balance) {
    const index = this.getAddressIndex(address);
    let currentNode = this.root;

    for (let i = 0; i < index.length; i++) {
      const nibble = index[i] >> 4;
      const isLeaf = i === index.length - 1;
      const key = nibble.toString(16);

      if (!currentNode[key]) {
        return false;
      } else if (isLeaf && currentNode[key] !== balance) {
        return false;
      }

      currentNode = currentNode[key];
    }

    return true;
  }
}

// 示例代码
const mpt = new MPT();
mpt.addOrUpdateAddress('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 100);
mpt.addOrUpdateAddress('0x95222290dd7278aa3ddd389cc1e1d165dd4bafe5', 150);
mpt.addOrUpdateAddress('0x95222290dd7278aa3ddd389cc1e1d165ee4bafe5', 175);
console.log(mpt.verify('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 100)); // true
console.log(mpt.verify('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', 200)); // false
console.log(mpt.verify('0x95222290dd7278aa3ddd389cc1e1d165dd4bafe5', 150)); // true
console.log(mpt.verify('0x95222290dd7278aa3ddd389cc1e1d165ee4bafe5', 175)); // true
