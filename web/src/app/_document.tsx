// src/app/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createGlobalStyle } from 'styled-components';

// Estilo global que incluye la fuente
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'OpenDyslexic';
    src: url('/fonts/OpenDyslexic-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'OpenDyslexic';  // Usar la fuente disléxica
    background-color: #f8f9fa;  // Color de fondo
    color: #212529;  // Color de texto por defecto
    transition: background-color 0.3s, color 0.3s;
  }
`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          {/* Aquí puedes incluir otros enlaces a fuentes o estilos */}
        </Head>
        <body>
          <GlobalStyle /> {/* Aplicar el estilo global */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
