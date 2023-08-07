import { useState } from 'react'

import GlobalStyle from './styles/global'

import Upload from './components/Upload'
import FileList from './components/FileList'

import { Container, Content } from './styles'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleUpload = (files) => {
    console.log(files)
  }

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        <FileList />
      </Content>
      <GlobalStyle />
    </Container>
  )
}

export default App
