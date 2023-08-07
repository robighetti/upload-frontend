import { createGlobalStyle } from 'styled-components'

import 'react-circular-progressbar/dist/styles.css'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: #932893;
    color: #333;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
  }
`
