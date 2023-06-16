// 导入 elliptic 库，用于实现基于椭圆曲线的数字签名
import elliptic from "elliptic";

// 创建一个椭圆曲线对象，并指定算法为 secp256k1
const ec = new elliptic.ec("secp256k1");

// 生成公私钥对的函数
export function generatePair() {
  // 使用 elliptic 提供的 genKeyPair() 方法生成一对公私钥
  const keypair = ec.genKeyPair();

  // 将生成的钥匙对保存在全局对象 window 中
  window.keypair = keypair;

  // 返回包含公钥和私钥的对象
  return {
    publicKey: keypair.getPublic("hex"), // 获取公钥的十六进制表示
    privateKey: keypair.getPrivate("hex") // 获取私钥的十六进制表示
  };
}

// 对消息使用私钥进行签名的函数
export function sign(message, privateKey) {
  try {
    // 使用 elliptic 提供的 keyFromPrivate() 方法导入私钥
    const keypair = ec.keyFromPrivate(privateKey, "hex");

    // 使用 keypair.sign() 方法对消息进行签名，并将结果转换为十六进制字符串
    return keypair.sign(message).toDER("hex");
  } catch (error) {
    // 如果签名出错，则返回 "invalid signature"
    return "invalid signature";
  }
}

// 验证由私钥签名的消息的函数
export function verifySignature(message, signature, publicKey) {
  try {
    // 使用 elliptic 提供的 keyFromPublic() 方法导入公钥
    const keypair = ec.keyFromPublic(publicKey, "hex");

    // 使用 elliptic 提供的 verify() 方法验证签名是否正确，并返回结果
    return ec.verify(message, signature, keypair);
  } catch (error) {
    // 如果出错，则返回 false
    return false;
  }
}
