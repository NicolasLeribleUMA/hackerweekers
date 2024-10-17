"use client"; // Necesario para usar estado en componentes funcionales
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Definición de los temas
const themes = {
  light: {
    name: 'light',
    background: '#f8f9fa',
    color: '#212529',
    buttonBackground: '#007bff',
    buttonColor: '#fff',
    svgColor: '#000',
    breadcrumbColor: '#007bff', // Azul por defecto en modo claro
  },
  dark: {
    name: 'dark',
    background: '#212529',
    color: '#f8f9fa',
    buttonBackground: '#007bff',
    buttonColor: '#fff',
    svgColor: '#f8f9fa',
    textColor: '#000', // Texto negro en modo oscuro
    embalseBackground: '#fff',
    breadcrumbColor: '#f8f9fa', // Blanco en modo oscuro
  },
  daltonic: {
    name: 'daltonic',
    background: '#FFD700',
    color: '#5F4B8C',
    buttonBackground: '#5F4B8C',
    buttonColor: '#FFD700',
    svgColor: '#5F4B8C',
    textColor: '#000',
    embalseBackground: '#fff',
    breadcrumbColor: '#5F4B8C', // Morado en modo daltónico
  },
};

async function getEmbalses() {
  const res = await fetch('https://g16469080dabc73-hackerweekers.adb.eu-madrid-1.oraclecloudapps.com/ords/admin/embalses/');
  const data = await res.json();

  // Extraer y devolver una lista de objetos con id y ambito_nombre
  return data.items.map(item => ({
    id: item.id,               
    embalse_nombre: item.embalse_nombre,
    ambito_nombre: item.ambito_nombre,
    agua_total: item.agua_total,
    electrico_flag: item.electrico_flag,
    longitud: getLong(item.id),
    latitud: getLati(item.id)
  }));
}

async function getLong(id) {
  const res = await fetch(`https://g16469080dabc73-hackerweekers.adb.eu-madrid-1.oraclecloudapps.com/ords/admin/listado_embalses/?q={"id_embalse":{"$eq":${id}}}`);
  const data = await res.json();

  if(data.items[0] !== undefined){
    return data.items[0].x;
  }else{
    return "no data";
  }
}

async function getLati(id) {
  const res = await fetch(`https://g16469080dabc73-hackerweekers.adb.eu-madrid-1.oraclecloudapps.com/ords/admin/listado_embalses/?q={"id_embalse":{"$eq":${id}}}`);
  const data = await res.json();

  if(data.items[0] !== undefined){
    return data.items[0].y;
  }else{
    return "no data";
  }
}

export default function Home() {
  const [selectedEmbalse, setSelectedEmbalse] = useState(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'daltonic'>('light');
  const [isDyslexic, setIsDyslexic] = useState(false); // Usar la fuente normal por defecto

  const [coordinates, setCoordinates] = useState({ lat: '', lon: '', radius: '100' });
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar u ocultar los filtros

  const [embalses, setEmbalses] = useState([]);

  useEffect(() => {
    async function fetchEmbalses() {
      const data = await getEmbalses();
      setEmbalses(data);
    }
    fetchEmbalses();
  }, []);

  // Usar la API de Geolocalización para obtener la ubicación real del dispositivo
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude.toFixed(6), lon: longitude.toFixed(6), radius: '100' });
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
          // Puedes definir valores por defecto si la geolocalización falla
          setCoordinates({ lat: "0.000000", lon: "0.000000", radius: '100' });
        }
      );
    } else {
      console.error("Geolocalización no es compatible con este navegador.");
    }
  }, []);

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
  };

  const handleBackToList = () => {
    setSelectedEmbalse(null);
  };

  // Función para alternar el estado de los filtros
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Efecto para cambiar el fondo del body al color del tema
  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].background;
  }, [theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <MainContent isDyslexic={isDyslexic}>
        <Header>
          <h1>HackerWeekers</h1>
          <InputSection onSubmit={handleSubmit}>
            <InputField isDyslexic={isDyslexic}>
              <input
                type="number"
                name="lat"
                value={coordinates.lat}
                onChange={handleCoordinateChange}
                placeholder="Latitud"
                aria-label="Latitud"
              />
            </InputField>
            <InputField isDyslexic={isDyslexic}>
              <input
                type="number"
                name="lon"
                value={coordinates.lon}
                onChange={handleCoordinateChange}
                placeholder="Longitud"
                aria-label="Longitud"
              />
            </InputField>
            <InputField isDyslexic={isDyslexic}>
              <input
                type="number"
                name="radius"
                value={coordinates.radius}
                onChange={handleCoordinateChange}
                placeholder="Radio"
                aria-label="Radio"
              />
            </InputField>
            <ButtonGroup>
              <Button type="submit" aria-label="Enviar">Enviar</Button>
              <Button type="button" onClick={toggleFilters} aria-label="Filtros">Filtros</Button>
            </ButtonGroup>
          </InputSection>

          <ThemeSwitch>
            <IconButton onClick={() => toggleTheme('light')} aria-label="Tema claro">
              <img src="/icons/sun.svg" alt="Tema claro" />
            </IconButton>
            <IconButton onClick={() => toggleTheme('dark')} aria-label="Tema oscuro">
              <img src="/icons/moon.svg" alt="Tema oscuro" />
            </IconButton>
            <IconButton onClick={() => toggleTheme('daltonic')} aria-label="Tema daltónico">
              <img src="/icons/daltonic.svg" alt="Tema daltónico" />
            </IconButton>
            <IconButton onClick={toggleFont} aria-label="Cambiar a fuente disléxica">
              <img src="/icons/dyslexia.svg" alt="Fuente disléxica" />
            </IconButton>
          </ThemeSwitch>
        </Header>
        {showFilters && (
          <FiltersSection>
            <h3>Filtros</h3>
            <FilterContainer>
              <FilterInput isDyslexic={isDyslexic}>
                <input type="number" placeholder="Capacidad mínima" aria-label="Capacidad mínima" />
              </FilterInput>
              <FilterInput isDyslexic={isDyslexic}>
                <input type="text" placeholder="Localidad" aria-label="Localidad" />
              </FilterInput>
              <FilterInput isDyslexic={isDyslexic}>
                <input type="text" placeholder="Demarcación" aria-label="Demarcación" />
              </FilterInput>
            </FilterContainer>
          </FiltersSection>
        )}

        <MainSection>
          {!selectedEmbalse ? (
            <>
              <h1>Lista de Embalses</h1>
              <EmbalseList>
                {embalses.map((embalse) => (
                  <EmbalseItem key={embalse.id} onClick={() => setSelectedEmbalse(embalse)}>
                    {embalse.id} - {embalse.embalse_nombre}
                  </EmbalseItem>
                ))}
              </EmbalseList>
            </>
          ) : (
            <>
              <Breadcrumb>
                <BreadcrumbItem onClick={handleBackToList} aria-label="Volver a la lista">Lista</BreadcrumbItem> &gt; Datos
              </Breadcrumb>
              <EmbalseDetails>
                <h2>{selectedEmbalse.embalse_nombre}</h2>
                <p>ambito: {selectedEmbalse.ambito_nombre}</p>
                <p>agua_total: {selectedEmbalse.agua_total}</p>
                <p>electrico_flag: {selectedEmbalse.electrico_flag}</p>
                <p>Coordenadas: {selectedEmbalse.longitud}, {selectedEmbalse.latitud}</p>
              </EmbalseDetails>
              <BackButton onClick={handleBackToList} aria-label="Volver">Volver</BackButton>
            </>
          )}
        </MainSection>
      </MainContent>
    </ThemeProvider>
  );
}

// Estilos de los componentes
const MainContent = styled.div<{ isDyslexic: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 0px;
  font-family: ${({ isDyslexic }) => (isDyslexic ? 'var(--font-opendyslexic)' : 'Arial, sans-serif')};
  font-size: ${({ isDyslexic }) => (isDyslexic ? '80%' : '100%')};
  color: ${({ theme }) => theme.color};
  height: auto;
  overflow: hidden;

  h1 {
    text-align: center;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    filter: ${({ theme }) =>
      theme.name === 'daltonic'
        ? 'brightness(0) saturate(40%) invert(18%) sepia(85%) saturate(4402%) hue-rotate(270deg) brightness(50%) contrast(60%)'
        : `brightness(0) saturate(40%) invert(${theme.svgColor === '#000' ? 0 : 1})`};
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ThemeSwitch = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;
  }
`;

const InputSection = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  padding: 10px;
  background: ${({ theme }) => theme.background};
  border: none;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputField = styled.div<{ isDyslexic: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: ${({ isDyslexic }) => (isDyslexic ? 'var(--font-opendyslexic)' : 'Arial, sans-serif')};

  input {
    font-size: 1.2rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const FiltersSection = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? '#2C2C2C' : theme.name === 'daltonic' ? '#5F4B8C' : '#FFFFFF'};
  color: ${({ theme }) =>
    theme.name === 'dark' ? '#FFFFFF' : theme.name === 'daltonic' ? '#FFD700' : theme.color};
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 70%; /* La ventana de filtros ocupará el 70% del ancho */
  margin: 20px auto; /* Centrar la ventana en la página */

  @media (max-width: 768px) {
    width: 90%; /* En móviles, que ocupe el 90% del ancho */
    padding: 15px;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: ${({ theme }) =>
      theme.name === 'dark' ? '#FFFFFF' : theme.name === 'daltonic' ? '#FFD700' : theme.color};
    text-align: center;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px; /* Mayor espacio entre los inputs en pantallas grandes */
  }
`;

const FilterInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 1rem;
    color: ${({ theme }) => theme.color};
  }

  input {
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: ${({ theme }) => (theme.name === 'dark' ? '#3A3A3A' : '#FFFFFF')};
    color: ${({ theme }) => theme.color};

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 8px; /* Ajuste de tamaño en móviles */
    }
  }
`;


const MainSection = styled.main`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;

  h1 {
    text-align: center;
  }
`;

const EmbalseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.textColor || theme.color};
  max-width: 800px;
  margin: 0 auto;
`;

const EmbalseItem = styled.div`
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9ecef;
  }

  color: ${({ theme }) => theme.textColor || theme.color};
`;

const EmbalseDetails = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: ${({ theme }) => theme.embalseBackground || theme.background};
  color: ${({ theme }) => theme.textColor || theme.color};
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor || theme.color};
  }

  p {
    margin: 5px 0;
    color: ${({ theme }) => theme.textColor || theme.color};
  }
`;

const BackButton = styled(Button)`
  display: block;
  margin: 20px auto;
`;

const Breadcrumb = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.breadcrumbColor};

  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbItem = styled.span`
  margin-right: 5px;
  text-decoration: underline;

  &:hover {
    outline: 1px solid blue;
  }
`;
