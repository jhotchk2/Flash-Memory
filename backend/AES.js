import CryptoJS from 'crypto-js'

export function encryptAES(plaintext, keys) {
  return CryptoJS.AES.encrypt(plaintext, keys[0]).toString()
}

export function decryptAES(ciphertext, keys) {
  return CryptoJS.AES.decrypt(ciphertext, keys[0]).toString(CryptoJS.enc.Utf8)
}