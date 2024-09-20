import express from 'express'
import cors from 'cors'
const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/test', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})