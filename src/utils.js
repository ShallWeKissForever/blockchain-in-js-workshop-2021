import sha256 from 'crypto-js/sha256.js'

export const validateHash = (hash) => {
  if (hash.length == 0 || !hash) return false

  return hash.length == 64
}

export const calcNonce = (block) => {
  console.log(`calc nonce of block ${block.height} `)
  const start = new Date().getTime()
  let calcTimes = 0
  while (!block.isValid()) {
    block.setNonce(sha256((new Date().getTime()+Math.random()).toString()).toString())
    block.caclTimes++
  }
  const end = new Date().getTime()
  block.caclTime = ((end - start) / 1000)
  console.log(
    `calc nonce cost ${block.caclTime}s, try ${block.caclTimes} times`,
  )
  return block
}
