import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GraficosPorSeccion() {
  const [rutasGraficos, setRutasGraficos] = useState({
    barras: '',
    torta: '',
    lineas: '',
    area: ''
  });

  // Estado para controlar la visibilidad de cada gráfico
  const [visibles, setVisibles] = useState({
    barras: false,
    torta: false,
    lineas: false,
    area: false
  });

  const opcionesGraficos = [
    {
      nombre: "Producción Energía Renovable",
      descripcion: "Aqui luis care lombriz agrega texto",
      endpoint: "/grafico/barras",
      clave: "barras"
    },
    {
      nombre: "Participación Energías Renovables",
      descripcion: "sobre el tema de las graficas",
      endpoint: "/grafico/torta",
      clave: "torta"
    },
    {
      nombre: "Tendencia Capacidad Instalada",
      descripcion: "esto esta en el request de los paises",
      endpoint: "/grafico/lineas",
      clave: "lineas"
    },
    {
      nombre: "Consumo Renovable vs Convencional",
      descripcion: "Compara el consumo de energía renovable frente a la convencional.",
      endpoint: "/grafico/area",
      clave: "area"
    }
  ];

  useEffect(() => {
    opcionesGraficos.forEach(grafico => {
      axios.get(`http://localhost:8000${grafico.endpoint}`)
        .then(response => {
          setRutasGraficos(prev => ({
            ...prev,
            [grafico.clave]: `http://localhost:8000${response.data.ruta}`
          }));
        })
        .catch(error => {
          console.error(`Error al obtener el gráfico ${grafico.nombre}:`, error);
        });
    });
  }, []);

  const mostrarGrafico = clave => {
    setVisibles(prev => ({ ...prev, [clave]: true }));
  };

  const cerrarGrafico = clave => {
    setVisibles(prev => ({ ...prev, [clave]: false }));
  };

  return (
    <div>
      {opcionesGraficos.map(grafico => (
        <section
          key={grafico.clave}
          style={{
            margin: '2rem 0',
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px'
          }}
        >
          <h3>{grafico.nombre}</h3>
          <p>{grafico.descripcion}</p>
          {!visibles[grafico.clave] ? (
            <button className="btn btn-success" onClick={() => mostrarGrafico(grafico.clave)}>
              Mostrar gráfico
            </button>
          ) : (
            <>
              {rutasGraficos[grafico.clave] ? (
                <div
                  style={{
                    background: '#fafafa',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '1rem',
                    margin: '1rem 0'
                  }}
                >
                  <img
                    src={rutasGraficos[grafico.clave]}
                    alt={`Gráfico: ${grafico.nombre}`}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                </div>
              ) : (
                <p>Cargando gráfico...</p>
              )}
              <br />
              <button className="btn btn-danger" onClick={() => cerrarGrafico(grafico.clave)}>
                Cerrar gráfico
              </button>
            </>
          )}
        </section>
      ))}
    </div>
  );
}