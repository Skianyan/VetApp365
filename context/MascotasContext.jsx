import React, { createContext, useContext, useState } from 'react';

const MascotasContext = createContext();

export const useMascotas = () => {
  const context = useContext(MascotasContext);
  if (!context) {
    throw new Error('useMascotas debe usarse dentro de MascotasProvider');
  }
  return context;
};

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);

  const agregarMascota = (nuevaMascota) => {
    const mascotaConId = {
      ...nuevaMascota,
      id: Date.now().toString(),
      consultas: [],
      vacunas: [],
    };
    setMascotas([...mascotas, mascotaConId]);
    return mascotaConId;
  };

  const agregarConsulta = (mascotaId, consulta) => {
    const consultaConId = {
      ...consulta,
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
    };
    setMascotas(mascotas.map(m => 
      m.id === mascotaId 
        ? { ...m, consultas: [...m.consultas, consultaConId] }
        : m
    ));
  };

  const agregarVacuna = (mascotaId, vacuna) => {
    const vacunaConId = {
      ...vacuna,
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
    };
    setMascotas(mascotas.map(m => 
      m.id === mascotaId 
        ? { ...m, vacunas: [...m.vacunas, vacunaConId] }
        : m
    ));
  };

  const obtenerMascotaPorId = (id) => {
    return mascotas.find(m => m.id === id);
  };

  return (
    <MascotasContext.Provider value={{
      mascotas,
      agregarMascota,
      agregarConsulta,
      agregarVacuna,
      obtenerMascotaPorId,
    }}>
      {children}
    </MascotasContext.Provider>
  );
};

