/* eslint-disable @typescript-eslint/no-empty-function */
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview, Actions } from './styles'

function FileList({ files }) {
  return (
    <Container>
      {files.map((file) => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />

            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                {file.url && <button onClick={() => {}}>Excluir</button>}
              </span>
            </div>
          </FileInfo>

          <Actions>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#932893' },
                }}
                strokeWidth={10}
                value={file.progress}
              />
            )}

            {file.url && (
              <a
                href="https://avatars.githubusercontent.com/u/45999236?v=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}

            {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}

            {file.error && <MdError size={24} color="#e57878" />}
          </Actions>
        </li>
      ))}
    </Container>
  )
}

export default FileList
