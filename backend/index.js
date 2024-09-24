import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { encrypt } from './encrypt.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.post('/test', (req, res) => {
  res.send('hello')
})

app.post('/encrypt', async (req, res) => {
  const plaintext = req.body.plaintext
  const filename = req.body.filename
  const keys = getKeys()

  const ciphertext = encrypt(plaintext, keys)
  fs.writeFile(`/Volumes/Untitled/${filename}`, ciphertext, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('file created!')
    }
  })
})

app.get('/decrypt', (req, res) => {
  
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