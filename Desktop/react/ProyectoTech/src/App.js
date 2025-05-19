import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardRenovable from './DashboardRenovable';
import FormularioEstimacion from './FormularioEstimacion';
import RequestPaises from './RequestPaises';
import TablaDatosHistoricos from './TablaDatosHistoricos';

function App() {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  return (
    <Router>
      <div className="container">
        <h2
  className="my-5 text-center"
  style={{
    alignItems: "center",
    color: "rgb(232, 232, 232)",
    textShadow: "1px 1px 3px rgb(0, 0, 0)"
  }}>
  Monitoreo Renovable
</h2>

        

        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardRenovable />
                <button
          className="btn btn-success mb-5"
          onClick={() => setMostrarTabla(!mostrarTabla)}
        >
          {mostrarTabla ? 'Ocultar Datos Históricos' : 'Mostrar Datos Históricos'}
        </button>
                {mostrarTabla && <TablaDatosHistoricos />}
                <FormularioEstimacion />
                <RequestPaises />
                
              </>
            }
          />
          <Route path="/historicos" element={<TablaDatosHistoricos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;