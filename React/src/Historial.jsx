import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Historial() {

  const [cotizaciones, setCotizaciones] = useState([]);
  
  useEffect(() => {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    setCotizaciones(cotizacionesGuardadas);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="center div-cotizador">
      <div className="historial-grid">
        <div className="historial-header">Fecha de cotización</div>
        <div className="historial-header">Propiedad</div>
        <div className="historial-header">Ubicación</div>
        <div className="historial-header">Metros cuadrados</div>
        <div className="historial-header">Póliza mensual</div>
        
        {cotizaciones.map((cotizacion, index) => (
          <div key={index} className="historial-item">
            <div>{cotizacion.fecha}</div>
            <div>{cotizacion.propiedad}</div>
            <div>{cotizacion.ubicacion}</div>
            <div>{cotizacion.metrosCuadrados}</div>
            <div>{cotizacion.precio.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="center separador">
        <button className="button button-outline" onClick={() => navigate(-1)}>VOLVER</button>
      </div>
    </div>
  );
}
