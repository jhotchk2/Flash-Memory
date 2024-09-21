import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [file, setFile] = useState()
  // const ciphertext = ''

  const onChange = (e) => {
    // e.preventDefault()
    // const reader = new FileReader()
    // reader.onload = async (e) => {
    //   const plaintext = e.target.result
    //   ciphertext = plaintext.concat('\nthis is the ciphertext')
    // }
    // reader.readAsText(e.target.files[0])
  }

  const onDownload = async (e) => {
    // const blob = new Blob([ciphertext], { type: 'text/plain' })
    // const url = URL.createObjectURL(blob)
    // const link = document.createElement('a')
    // link.href = url
    // link.download = `${file.name}-encrypted`
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
    // window.URL.revokeObjectURL(url)
    e.preventDefault()
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    const resp = await axios.post('http://localhost:8080/encrypt', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  }

  return (
    <form onSubmit={(e) => onDownload(e)}>
      <h1 className='header'>Please Select a File to Encrypt</h1>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />

      <button type='submit'>Download</button>
    </form>
  )
}

export default App
