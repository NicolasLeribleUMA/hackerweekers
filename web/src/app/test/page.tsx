"use client";
import { useState, useEffect } from 'react';

async function getEmbalses() {
    const res = await fetch('https://g16469080dabc73-hackerweekers.adb.eu-madrid-1.oraclecloudapps.com/ords/admin/embalses/');
    const data = await res.json();

    // Extraer y devolver una lista de objetos con id y ambito_nombre
    return data.items.map(item => ({
        id: item.id,               // Asume que el campo se llama 'id'
        ambito_nombre: item.embalse_nombre // Asume que el campo se llama 'ambito_nombre'
    }));
}

export default function Home() {
    const [embalses, setEmbalses] = useState([]);

    useEffect(() => {
        async function fetchEmbalses() {
            const data = await getEmbalses();
            setEmbalses(data);
        }
        fetchEmbalses();
    }, []);

    return (
        <div>
            <h1>Lista de Ámbitos y IDs de los Embalses</h1>
            <ul>
                {embalses.map((embalse) => (
                    <li key={embalse.id}>{embalse.id} - {embalse.ambito_nombre}</li>
                ))}
            </ul>
        </div>
    );
}
