import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { lightTheme, darkTheme, daltonicTheme } from '../styles/themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  const toggleTheme = (selectedTheme) => {
    if (selectedTheme === 'light') setTheme(lightTheme);
    if (selectedTheme === 'dark') setTheme(darkTheme);
    if (selectedTheme === 'daltonic') setTheme(daltonicTheme);
  };

  const toggleFont = () => {
    setDyslexicFont(!dyslexicFont);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle dyslexicFont={dyslexicFont} />
      <Component {...pageProps} toggleTheme={toggleTheme} toggleFont={toggleFont} />
    </ThemeProvider>
  );
}

export default MyApp;
