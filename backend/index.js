import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { encrypt } from './encrypt.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.post('/test', (req, res) => {
  const name = req.body
  console.log(name)
})

app.post('/encrypt', (req, res) => {
  const plaintext = req.body.plaintext
  const key = req.body.key
  const filename = req.body.filename
  const ciphertext = encrypt(plaintext, key)
  fs.writeFile(`/Volumes/Untitled/${filename}`, ciphertext, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('file created!')
    }
  });
})

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})