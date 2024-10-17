// src/app/page.tsx

"use client"; // Necesario para usar estado en componentes funcionales
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Ejemplo de datos
const embalsesEjemplo = [
  {
    id: 1,
    nombre: 'Embalse A',
    capacidad: '1000 m³',
    localidad: 'Madrid',
    demarcacion: 'Tajo',
    coordenadas: '40.4168° N, 3.7038° W',
    radio: '50 m',
  },
  {
    id: 2,
    nombre: 'Embalse B',
    capacidad: '2000 m³',
    localidad: 'Barcelona',
    demarcacion: 'Ebro',
    coordenadas: '41.3888° N, 2.15899° E',
    radio: '75 m',
  },
  {
    id: 3,
    nombre: 'Embalse C',
    capacidad: '1500 m³',
    localidad: 'Valencia',
    demarcacion: 'Júcar',
    coordenadas: '39.4699° N, -0.3763° W',
    radio: '60 m',
  },
];

// Definición de los temas
const themes = {
  light: {
    background: '#f8f9fa',
    color: '#212529',
    buttonBackground: '#007bff',
    buttonColor: '#fff',
  },
  dark: {
    background: '#212529',
    color: '#f8f9fa',
    buttonBackground: '#007bff',
    buttonColor: '#fff',
  },
  daltonic: {
    background: '#FFD700',
    color: '#5F4B8C',
    buttonBackground: '#5F4B8C',
    buttonColor: '#FFD700',
  },
};

export default function Home() {
  const [selectedEmbalse, setSelectedEmbalse] = useState(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'daltonic'>('light');
  const [isDyslexic, setIsDyslexic] = useState(false); // Usar la fuente normal por defecto

  const [coordinates, setCoordinates] = useState({ x: '', y: '', radius: '' });

  const toggleTheme = (newTheme: 'light' | 'dark' | 'daltonic') => {
    setTheme(newTheme);
  };

  const toggleFont = () => {
    setIsDyslexic(prev => !prev); // Alternar entre fuentes
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinates(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Coordenadas:', coordinates);
    // Aquí podrías manejar las coordenadas (enviar a un backend, etc.)
  };

  const handleBackToList = () => {
    setSelectedEmbalse(null);
  };

  // Efecto para cambiar el fondo del body al color del tema
  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].background;
  }, [theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <MainContent isDyslexic={isDyslexic}>
        <Header>
          <ThemeSwitch>
            <Button onClick={() => toggleTheme('light')} title="Tema claro">
              🌞 {/* Sol */}
            </Button>
            <Button onClick={() => toggleTheme('dark')} title="Tema oscuro">
              🌜 {/* Luna */}
            </Button>
            <Button onClick={() => toggleTheme('daltonic')} title="Tema daltónico">
              🔶 {/* Círculo amarillo */}
            </Button>
            <Button onClick={toggleFont} title="Cambiar a fuente disléxica">
              Cambiar a Fuente {isDyslexic ? 'Normal' : 'Disléxica'}
            </Button>
          </ThemeSwitch>
          <InputSection onSubmit={handleSubmit}>
            <InputField>
              <input
                type="text"
                name="x"
                value={coordinates.x}
                onChange={handleCoordinateChange}
                placeholder="Coordenada X"
              />
            </InputField>
            <InputField>
              <input
                type="text"
                name="y"
                value={coordinates.y}
                onChange={handleCoordinateChange}
                placeholder="Coordenada Y"
              />
            </InputField>
            <InputField>
              <input
                type="text"
                name="radius"
                value={coordinates.radius}
                onChange={handleCoordinateChange}
                placeholder="Radio"
              />
            </InputField>
            <Button type="submit">Enviar</Button>
          </InputSection>
        </Header>

        <MainSection>
          {!selectedEmbalse ? (
            <>
              <h1>Lista de Embalses</h1>
              <EmbalseList>
                {embalsesEjemplo.map((embalse) => (
                  <EmbalseItem key={embalse.id} onClick={() => setSelectedEmbalse(embalse)}>
                    {embalse.nombre}
                  </EmbalseItem>
                ))}
              </EmbalseList>
            </>
          ) : (
            <>
              <Breadcrumb>
                <BreadcrumbItem onClick={handleBackToList}>Lista</BreadcrumbItem> &gt; Datos
              </Breadcrumb>
              <h1>Detalles del Embalse</h1>
              <EmbalseDetails>
                <h2>{selectedEmbalse.nombre}</h2>
                <p>Capacidad: {selectedEmbalse.capacidad}</p>
                <p>Localidad: {selectedEmbalse.localidad}</p>
                <p>Demarcación: {selectedEmbalse.demarcacion}</p>
                <p>Coordenadas: {selectedEmbalse.coordenadas}</p>
                <p>Radio: {selectedEmbalse.radio}</p>
              </EmbalseDetails>
              <BackButton onClick={handleBackToList}>Volver</BackButton>
            </>
          )}
        </MainSection>
      </MainContent>
    </ThemeProvider>
  );
}

// Estilos de los componentes
const MainContent = styled.div<{ isDyslexic: boolean }>`
  padding: 20px;
  font-family: ${({ isDyslexic }) => (isDyslexic ? 'var(--font-opendyslexic)' : 'Arial, sans-serif')}; // Usar la fuente disléxica o Arial
  color: ${({ theme }) => theme.color};
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Evitar que aparezca scroll en la parte principal */
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap; // Permitir que los elementos se muevan a la siguiente línea en pantallas más pequeñas
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
`;

const ThemeSwitch = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const InputSection = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  padding: 10px;
  background: ${({ theme }) => theme.background};
  border: none; /* Cambiado a none para quitar el borde */
  flex-wrap: wrap; /* Permitir que los inputs y botón se ajusten en varias líneas si es necesario */
  overflow: hidden; /* Evitar que aparezca scroll en la sección de inputs */
`;

const InputField = styled.div`
  flex-grow: 1; /* Hacer que el input crezca para ocupar espacio */
  min-width: 150px; /* Establecer un ancho mínimo para inputs */
  display: flex;
  flex-direction: column;
`;

const MainSection = styled.main`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto; /* Permitir el desplazamiento vertical si es necesario */
`;

const EmbalseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmbalseItem = styled.div`
  padding: 10px;
  border: none; /* Cambiado a none para quitar el borde */
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9ecef;
  }
`;

const EmbalseDetails = styled.div`
  padding: 10px;
  border: none; /* Cambiado a none para quitar el borde */
  background-color: #ffffff;
`;

const BackButton = styled.button`
  margin-top: 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Breadcrumb = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbItem = styled.span`
  margin-right: 5px;
`;
