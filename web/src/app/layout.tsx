// src/app/layout.tsx

import localFont from '@next/font/local';

const openDyslexic = localFont({
  src: '../public/fonts/OpenDyslexic-Regular.otf',
  variable: '--font-opendyslexic',
});

export const metadata = {
  title: 'Embalses',
  description: 'Datos sobre embalses',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${openDyslexic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
