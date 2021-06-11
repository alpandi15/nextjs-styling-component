import CryptoJS from 'crypto-js'

const key = 'password'

export const encrypt = async (data: any) => {
  const ciphertext = CryptoJS.AES.encrypt(data, key).toString()
  // console.log('BEFORE ', ciphertext)
  const replacingCipher = ciphertext
  // .replace('+','xMl3Jk')
  // .replace('/','-space-')
  // .replace('=','Ml32')
  // .replace('++','aMl3Jk')
  // .replace('==','ol32')
  // .replace('//','oi23')
  return replacingCipher
}

export const decrypt = async (data: any) => {
  const ciphertext = data.toString()
  // .replace('xMl3Jk', '+' )
  // .replace('Por21Ld', '/')
  // .replace('Ml32', '=')
  // .replace('aMl3Jk','++')
  // .replace('ol32','==')
  // .replace('oi23','//')
  // Decrypt
  const bytes  = CryptoJS.AES.decrypt(ciphertext, key)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8).toString()
  return decryptedData
}


export const encryptBase64 = async (data: any) => {
  const ciphertext = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
  return ciphertext
}

export const decryptBase64 = async (data: any) => {
  const ciphertext = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  return ciphertext
}