// Almacenamiento de datos de mascotas
let mascotas = {};

export const obtenerMascotas = () => {
  return mascotas;
};

export const obtenerMascotaPorNombre = (nombre) => {
  return mascotas[nombre] || null;
};

export const agregarMascota = (datosMascota) => {
  const nombre = datosMascota.nombre;
  if (mascotas[nombre]) {
    return false; // La mascota ya existe
  }
  
  mascotas[nombre] = {
    ...datosMascota,
    consultas: [],
    vacunas: [],
  };
  
  return true;
};

export const agregarConsulta = (nombreMascota, consulta) => {
  if (!mascotas[nombreMascota]) {
    return false;
  }
  
  const nuevaConsulta = {
    fecha: new Date().toISOString(),
    ...consulta,
  };
  
  mascotas[nombreMascota].consultas.push(nuevaConsulta);
  return true;
};

export const agregarVacuna = (nombreMascota, vacuna) => {
  if (!mascotas[nombreMascota]) {
    return false;
  }
  
  const nuevaVacuna = {
    fecha: new Date().toISOString(),
    ...vacuna,
  };
  
  mascotas[nombreMascota].vacunas.push(nuevaVacuna);
  return true;
};

export const buscarMascotas = (termino) => {
  const terminoLower = termino.toLowerCase();
  return Object.values(mascotas).filter(mascota => 
    mascota.nombre.toLowerCase().includes(terminoLower) ||
    mascota.propietario.toLowerCase().includes(terminoLower)
  );
};

