"use client"; // Necesario para que useState funcione en un componente del lado del cliente

import { useState } from 'react';

// Función de Haversine para calcular la distancia entre dos puntos geodésicos
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Convertir grados a radianes
function toRad(value) {
    return value * Math.PI / 180;
}

// Datos de prueba de embalses
const embalsesEjemplo = [
    { id: 1, nombre: 'Embalse A', lat: 40.4168, lon: -3.7038 }, // Madrid
    { id: 2, nombre: 'Embalse B', lat: 41.3888, lon: 2.15899 }, // Barcelona
    { id: 3, nombre: 'Embalse C', lat: 39.4699, lon: -0.3763 }  // Valencia
];

export default function App() {
    const [coordinates, setCoordinates] = useState({ lat: '', lon: '', radius: '100' });
    const [filteredEmbalses, setFilteredEmbalses] = useState(embalsesEjemplo);

    const handleCoordinateChange = (e) => {
        const { name, value } = e.target;
        setCoordinates(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lat = parseFloat(coordinates.lat);
        const lon = parseFloat(coordinates.lon);
        const radius = parseFloat(coordinates.radius);

        // Filtrar embalses dentro del radio
        const filtered = embalsesEjemplo.filter(embalse => {
            const distance = haversineDistance(lat, lon, embalse.lat, embalse.lon);
            return distance <= radius;
        });

        setFilteredEmbalses(filtered);
    };

    return (
        <div>
            <h1>Filtrar Embalses por Distancia</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="lat"
                    value={coordinates.lat}
                    onChange={handleCoordinateChange}
                    placeholder="Latitud"
                />
                <input
                    type="number"
                    name="lon"
                    value={coordinates.lon}
                    onChange={handleCoordinateChange}
                    placeholder="Longitud"
                />
                <input
                    type="number"
                    name="radius"
                    value={coordinates.radius}
                    onChange={handleCoordinateChange}
                    placeholder="Radio (km)"
                />
                <button type="submit">Buscar</button>
            </form>

            <h2>Embalses dentro del radio</h2>
            <ul>
                {filteredEmbalses.map(embalse => (
                    <li key={embalse.id}>{embalse.nombre}</li>
                ))}
            </ul>
        </div>
    );
}
