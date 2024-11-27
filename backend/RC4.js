import CryptoJS from 'crypto-js'

export function encryptRC4(plaintext, keys) {
  return CryptoJS.RC4.encrypt(plaintext, keys[0]).toString()
}

export function decryptRC4(ciphertext, keys) {
  return CryptoJS.RC4.decrypt(ciphertext, keys[0]).toString(CryptoJS.enc.Utf8)
}