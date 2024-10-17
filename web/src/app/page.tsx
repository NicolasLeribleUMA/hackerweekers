"use client";
import { useState } from 'react';
import styled from 'styled-components';

const embalsesEjemplo = [
  { id: 1, nombre: 'Embalse A', capacidad: '1000 m³', localidad: 'Madrid', demarcacion: 'Tajo' },
  { id: 2, nombre: 'Embalse B', capacidad: '2000 m³', localidad: 'Barcelona', demarcacion: 'Ebro' },
  { id: 3, nombre: 'Embalse C', capacidad: '1500 m³', localidad: 'Valencia', demarcacion: 'Júcar' },
];

export default function Home({ toggleTheme, toggleFont }) {
  const [selectedEmbalse, setSelectedEmbalse] = useState(null);

  return (
    <Container>
      <Header>
        <SearchFilter>
          <div>
            <label>Coordenada X:</label>
            <input type="text" />
          </div>
          <div>
            <label>Coordenada Y:</label>
            <input type="text" />
          </div>
          <div>
            <label>Radio (km):</label>
            <input type="number" />
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