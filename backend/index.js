import express from 'express'
import cors from 'cors'
import fs from 'fs'
import os from 'os'
import { encrypt as encryptPoly, decrypt as decryptPoly } from './polyalphabetic.js'
import { encryptAES, decryptAES } from './AES.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.post('/encrypt', (req, res) => {
  const plaintext = req.body.plaintext
  const filename = req.body.filename
  const option = req.body.option
  const homeDir = os.homedir()

  const ciphertext = encrypt(plaintext, option)
  fs.writeFile(`/Volumes/Untitled/${filename}`, ciphertext, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('File Encrypted')
    }
  })
  fs.unlink(`${homeDir}/Documents/${filename}`, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('file deleted');
    }
  })

  res.status(201).send('File Encrypted')
})

app.post('/decrypt', (req, res) => {
  const ciphertext = req.body.ciphertext
  const filename = req.body.filename
  const option = req.body.option
  const homeDir = os.homedir()

  const plaintext = decrypt(ciphertext, option)
  fs.writeFile(`${homeDir}/Desktop/${filename}`, plaintext, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('file decrypted!')
    }
  })
  fs.unlink(`/Volumes/Untitled/${filename}`, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('file deleted');
    }
  })

  res.status(201).send('File Decrypted')
})

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})

function getKeys() {
  let key = ''
  let ciphers = []

  try {
    key = fs.readFileSync('/Volumes/Untitled/.key.txt', 'utf8')
  } catch (err) {
    console.log(err)
  }

  try {
    const data = fs.readFileSync('/Volumes/Untitled/.cipher.txt', 'utf8')
    ciphers = data.split('\n')
  } catch (err) {
    console.log(err)
  }

  return [key, ...ciphers]
}

function encrypt(plaintext, option) {
  const keys = getKeys()

  switch (option) {
    case 'polyalphabetic-grid-cipher':
      return encryptPoly(plaintext, keys)
    case 'aes':
      return encryptAES(plaintext, keys)
  }
}

function decrypt(ciphertext, option) {
  const keys = getKeys()

  switch (option) {
    case 'polyalphabetic-grid-cipher':
      return decryptPoly(ciphertext, keys)
    case 'aes':
      return decryptAES(ciphertext, keys)
  }
}