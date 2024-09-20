import { useState } from 'react'

const App = () => {
  const [file, setFile] = useState()
  // const ciphertext = ''

  // const onChange = (e) => {
  //   e.preventDefault()
  //   const reader = new FileReader()
  //   reader.onload = async (e) => {
  //     const plaintext = e.target.result
  //     ciphertext = plaintext.concat('\nthis is the ciphertext')
  //   }
  //   reader.readAsText(e.target.files[0])
  // }

  const onDownload = () => {
    const blob = new Blob([ciphertext], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${file.name}-encrypted`
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <h1 className='header'>Please Select a File to Encrypt</h1>
      <input type='file' onChange={(e) => onChange(e)} />

      <button onClick={onDownload}>Download</button>
    </>
  )
}

export default App
