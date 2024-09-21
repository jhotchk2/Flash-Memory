import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { encrypt } from './encrypt.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/test', (req, res) => {
  res.send('hello world')
})

app.post('/encrypt', (req, res) => {
  // const ciphertext = encrypt()
  // fs.writeFile('/Volumes/Untitled/test.txt', ciphertext, err => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('file created!')
  //   }
  // });
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})