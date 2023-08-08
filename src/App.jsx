import { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'

import GlobalStyle from './styles/global'

import Upload from './components/Upload'
import FileList from './components/FileList'
import api from './services/api'

import { Container, Content } from './styles'

function App() {
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const fileInputRef = useRef(null)

  const handleUpload = (files) => {
    const file = files[0]

    if (!file) return

    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split('.'[1])}`
        : file.name

    const formData = new FormData()
    formData.append('file', file)

    setFiles((prevState) => [...prevState, { name: fileName, loading: 0 }])
    setShowProgress(true)

    api
      .post('http://localhost:3333/posts', formData, {
        onUploadProgress: ({ loaded, total }) => {
          setFiles((prevState) => {
            const newFiles = [...prevState]
            newFiles[newFiles.length - 1].loading = Math.round(
              (loaded * 100) / total,
            )
            return newFiles
          })

          if (loaded === total) {
            const fileSize =
              total < 1024
                ? `${total} bytes`
                : `${(loaded / (1024 * 1024)).toFixed(2)} MB`
            setUploadedFiles([
              ...uploadedFiles,
              {
                name: fileName,
                size: fileSize,
                preview: URL.createObjectURL(file),
              },
            ])
            setFiles([])
            setShowProgress(false)
          }
        },
      })
      .catch(console.error)
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} ref={fileInputRef} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Content>
      <GlobalStyle />
    </Container>
  )
}

export default App
