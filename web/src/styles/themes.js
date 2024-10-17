import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  background: '#FFFFFF',
  color: '#000000',
};

export const darkTheme = {
  background: '#000000',
  color: '#FFFFFF',
};

export const daltonicTheme = {
  background: '#FFD700', // Amarillo
  color: '#800080',      // Morado
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: ${({ dyslexicFont }) => (dyslexicFont ? 'OpenDyslexic' : 'Arial, sans-serif')};
  }
`;

export default GlobalStyle;
