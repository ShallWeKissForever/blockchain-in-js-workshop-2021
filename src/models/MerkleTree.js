import crypto from "crypto";

class MerkleTree {
    constructor(elements) {
        // 将元素集合按字典序排序
        this.elements = elements.sort();

        // 递归计算根哈希值
        this.rootHash = this.buildTree(this.elements);
    }

    // 递归计算哈希值
    buildTree(elements) {
        //没有元素
        if (elements.length === 0) {
            return crypto.createHash('sha256').update('').digest('hex'); //hash十六进制字符串
        //只有一个元素
        } else if (elements.length === 1) {
            return crypto.createHash('sha256').update(elements[0]).digest('hex');
        } else {  //如果元素的个数超过1,就递归拆分为两个子集合,直到每个集合的长度为1再进行运算哈希,然后依次合并
            const mid = Math.floor(elements.length / 2);   //Math.floor表示向下取整
            const leftHash = this.buildTree(elements.slice(0, mid));
            const rightHash = this.buildTree(elements.slice(mid));  //mid ~ elements.length
            return crypto.createHash('sha256').update(leftHash + rightHash).digest('hex');
        }
    }

    //增加节点
    addElement(element){
        this.elements.push(element);
        this.elements.sort();
        this.rootHash = this.buildTree(this.elements);
    }

    //删除节点
    delElement(element){
        if (this.elements.includes(element) == false){
            console.log("Error:element ${element} doesn't exsist")
            return
        }else {
            //添加指定元素
            this.elements.prototype.filter(element);
            this.elements.sort();
            this.rootHash = this.buildTree(this.elements);
        }
    }

    //验证是否存在某个节点
    verify(data){
        const hash = crypto.createHash('sha256').update(data).digest('hex')
        return this._verifyHash(hash,this.rootHash,this.elements)
    }
    _verifyHash(hash,rootHash,elements){
        //与目前的根节点相等,则在Merkle树中
        if (hash === rootHash){
            return true
        }
        //遍历到了叶子节点但是也没有,则不在Merkle树中
        if (elements.length == 1){
            return false
        }
        //否则继续递归验证在左子树还是右子树中
        const mid = Math.floor(elements.length/2)
        // 左/右子树hash,通过join()连成一个字符串进行计算
        const leftHash = crypto.createHash('sha256').update(elements.slice(0,mid).join('')).digest('hex')
        const rightHash = crypto.createHash('sha256').update(elements.slice(mid).join('')).digest('hex')
        if (hash == leftHash){  //如果等于左子树的hash,怎返回true
            return true
        }else if (hash == rightHash){
            return true
        }else {   //否则就依次递归遍历
            const r1 = this._verifyHash(hash,leftHash,elements.slice(0,mid))
            const r2 = this._verifyHash(hash,rightHash,elements.slice(mid))
            return r1 || r2
        }
    }
}

export default MerkleTree

// const elements = ["a","v","b","d"];
// const merkleTree = new MerkleTree(elements);
// // 输出 Merkle 根节点的哈希值
// console.log('Merkle Root:', merkleTree.rootHash); 
// //添加元素
// merkleTree._addElement("e")
// console.log('Merkle Root:', merkleTree.rootHash);
// //验证是否有某个元素
// console.log(merkleTree.verify("x"))
// console.log(merkleTree.verify("b"))