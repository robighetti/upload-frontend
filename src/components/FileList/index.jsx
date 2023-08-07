/* eslint-disable @typescript-eslint/no-empty-function */
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview, Actions } from './styles'

function FileList() {
  return (
    <Container>
      <li>
        <FileInfo>
          <Preview src="https://avatars.githubusercontent.com/u/45999236?v=4" />

          <div>
            <strong>profile.png</strong>
            <span>
              64kb <button onClick={() => {}}>Excluir</button>
            </span>
          </div>
        </FileInfo>

        <Actions>
          <CircularProgressbar
            styles={{
              root: { width: 24 },
              path: { stroke: '#932893' },
            }}
            strokeWidth={10}
            value={60}
          />
          <a
            href="https://avatars.githubusercontent.com/u/45999236?v=4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
          </a>

          <MdCheckCircle size={24} color="#78e5d5" />

          <MdError size={24} color="#e57878" />
        </Actions>
      </li>
    </Container>
  )
}

export default FileList
