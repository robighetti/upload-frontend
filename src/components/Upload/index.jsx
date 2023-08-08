/* eslint-disable @typescript-eslint/no-empty-function */
import { useDropzone } from 'react-dropzone'

import { DropContainer, UploadMessage } from './styles'

function Upload({ onUpload, ref }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive: isdragactive,
    isDragReject,
  } = useDropzone({ onDropAccepted: onUpload })

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }

  return (
    <DropContainer
      {...getRootProps()}
      isDragActive={isdragactive}
      isDragReject={isDragReject}
    >
      <input {...getInputProps()} ref={ref} />
      {renderDragMessage(isdragactive, isDragReject)}
    </DropContainer>
  )
}

export default Upload
