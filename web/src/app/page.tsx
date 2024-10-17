"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const embalsesEjemplo = [
    { id: 1, nombre: 'Embalse A', capacidad: '1000 m³', localidad: 'Madrid', demarcacion: 'Tajo', x: "0", y: "0" },
    { id: 2, nombre: 'Embalse B', capacidad: '2000 m³', localidad: 'Barcelona', demarcacion: 'Ebro', x: "75", y: "75" },
    { id: 3, nombre: 'Embalse C', capacidad: '1500 m³', localidad: 'Valencia', demarcacion: 'Júcar', x: "150", y: "150" },
];

export default function Home({ toggleTheme, toggleFont }) {
    const [selectedEmbalse, setSelectedEmbalse] = useState(null);
    const [coords, setCoords] = useState({ lat: '', lon: '' });
    const [radio, setRadio] = useState('100');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ lat: latitude.toFixed(6), lon: longitude.toFixed(6) });
                },
                (error) => {
                    console.error("Error al obtener la ubicación: ", error);
                    // Puedes definir valores por defecto si la geolocalización falla
                    setCoords({ lat: "0.000000", lon: "0.000000" });
                }
            );
        } else {
            console.error("Geolocalización no es compatible con este navegador.");
        }
    }, []);

<<<<<<< Updated upstream
    const handleSearch = () => {
        // Imprime los valores de las coordenadas y el radio en la consola
        console.log('Coordenada X:', coords.lat);
        console.log('Coordenada Y:', coords.lon);
        console.log('Radio (km):', radio);
    };
=======
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '', radius: '100' });
>>>>>>> Stashed changes

    return (
        <Container>
            <Header>
                <SearchFilter>
                    <div>
                        <label>Coordenada X:</label>
                        <input
                            type="text"
                            value={coords.lat}
                            onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Coordenada Y:</label>
                        <input
                            type="text"
                            value={coords.lon}
                            onChange={(e) => setCoords({ ...coords, lon: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Radio (km):</label>
                        <input
                            type="text"
                            value={radio}
                            onChange={(e) => setRadio(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleSearch}>Buscar</button>
                    </div>
                </SearchFilter>
                <ThemeSwitch>
                    <button onClick={() => toggleTheme('light')}>Tema Claro</button>
                    <button onClick={() => toggleTheme('dark')}>Tema Oscuro</button>
                    <button onClick={() => toggleTheme('daltonic')}>Tema Daltonico</button>
                </ThemeSwitch>
                <FontSwitch>
                    <button onClick={toggleFont}>Cambiar Fuente</button>
                </FontSwitch>
            </Header>

<<<<<<< Updated upstream
            <MainContent>
                {!selectedEmbalse ? (
                    <>
                        <Breadcrumbs>Lista</Breadcrumbs>
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
                        <Breadcrumbs>
                            Lista &gt; Datos
                            <BackButton onClick={() => setSelectedEmbalse(null)}>Volver</BackButton>
                        </Breadcrumbs>
                        <EmbalseDetails>
                            <h2>{selectedEmbalse.nombre}</h2>
                            <p>Capacidad: {selectedEmbalse.capacidad}</p>
                            <p>Localidad: {selectedEmbalse.localidad}</p>
                            <p>Demarcación: {selectedEmbalse.demarcacion}</p>
                        </EmbalseDetails>
                    </>
                )}
            </MainContent>
        </Container>
    );
=======
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
              <label htmlFor="x">Latitud:</label>
              <input
                type="text"
                name="x"
                value={coordinates.lat}
                onChange={handleCoordinateChange}
              />
            </InputField>
            <InputField>
              <label htmlFor="y">Longitud:</label>
              <input
                type="text"
                name="y"
                value={coordinates.lon}
                onChange={handleCoordinateChange}
              />
            </InputField>
            <InputField>
              <label htmlFor="radius">Radio:</label>
              <input
                type="text"
                name="radius"
                value={coordinates.radius}
                onChange={handleCoordinateChange}
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
              <h1>Detalles del Embalse</h1>
              <EmbalseDetails>
                <h2>{selectedEmbalse.nombre}</h2>
                <p>Capacidad: {selectedEmbalse.capacidad}</p>
                <p>Localidad: {selectedEmbalse.localidad}</p>
                <p>Demarcación: {selectedEmbalse.demarcacion}</p>
                <p>Coordenadas: {selectedEmbalse.coordenadas}</p>
                <p>Radio: {selectedEmbalse.radio}</p>
              </EmbalseDetails>
              <BackButton onClick={() => setSelectedEmbalse(null)}>Volver</BackButton>
            </>
          )}
        </MainSection>
      </MainContent>
    </ThemeProvider>
  );
>>>>>>> Stashed changes
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const SearchFilter = styled.div`
  display: flex;
  gap: 10px;
`;

const ThemeSwitch = styled.div`
  margin-top: 10px;
  button {
    margin-right: 10px;
  }
`;

const FontSwitch = styled.div`
  margin-top: 10px;
  button {
    margin-right: 10px;
  }
`;

const MainContent = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
`;

const BackButton = styled.button`
  margin-left: 20px;
`;

const EmbalseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmbalseItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

const EmbalseDetails = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
`;