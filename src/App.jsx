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

  // const getAllUploadedFiles = useMemo(() => {}, [])

  const handleUpload = (files) => {
    /*  const data = files.map((file) => ({
      file,
      id: uuid(),
      name: file.name,
      readableSize: formatBytes(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    setUploadedFiles(data)
    handleUploads(data)
 */
    // data.forEach(uploadProcess)
    /* setUploadedFiles((prevState) => {
      return [...prevState, uploadedFiledReceived]
    })

    console.log(uploadedFiledReceived) */
    // uploadedFiledReceived.forEach((item) => uploadProcess(item))
  }

  const handleUploads = (files) => {
    console.log(files)

    for (const file of files) {
      const data = new FormData()

      data.append('file', file.file, file.name)

      api.post('posts', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))

          const finalResult = files.map((item) => {
            return file.id === item.id ? { ...item, progress } : item
          })

          setUploadedFiles(finalResult)
        },
      })
    }
  }

  const uploadProcess = (updatedFile) => {
    console.log('uploadProcess', updatedFile)
    const data = new FormData()

    data.append('file', updatedFile.file, updatedFile.name)

    api
      .post('posts', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))
          console.log('onUploadProgress', progress)

          updateFile(updatedFile.id, progress)
        },
      })
      .then((response) => {
        // console.log('response', response)
        /* updateFile(updatedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        }) */
      })
      .catch((err) => {
        console.log('error', err)

        /* updateFile(updatedFile.id, {
          uploaded: true,
        }) */
      })
  }

  const updateFile = (id, data) => {
    console.log('updateFile', id, data)
    console.log('uploadedFiles', uploadedFiles)

    const result = uploadedFiles.map((uploadedFile) => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile
    })

    // setUploadedFiles(result)
    // console.log(uploadedFiles)
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
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Content>
      <GlobalStyle />
    </Container>
  )
}

export default App
