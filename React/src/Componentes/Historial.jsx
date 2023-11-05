import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Historial() {
  const [cotizaciones, setCotizaciones] = useState([]);

  function Eliminar(index) {
    const nuevasCotizaciones = [...cotizaciones];
    nuevasCotizaciones.splice(index, 1);
    setCotizaciones(nuevasCotizaciones);

    localStorage.setItem("cotizaciones", JSON.stringify(nuevasCotizaciones));
  }

  useEffect(() => {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    setCotizaciones(cotizacionesGuardadas);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
    <h2 className = "semi">Historial de cotizaciones</h2>
    <div className="center div-cotizador">
      <div className="historial-grid">
        <div className="historial-grid">Fecha</div>
        <div className="historial-grid">Propiedad</div>
        <div className="historial-grid">Ubicación</div>
        <div className="historial-grid">Metros</div>
        <div className="historial-grid">Precio</div>
        <div></div>

        {cotizaciones.map((cotizacion, index) => (
          <div key={index} className="historial-item">
            <div>{cotizacion.fecha}</div>
            <div>{cotizacion.propiedad}</div>
            <div>{cotizacion.ubicacion}</div>
            <div>{cotizacion.metrosCuadrados}</div>
            <div>{cotizacion.precio.toFixed(2)}</div>
            <button onClick={() => Eliminar(index)}>Eliminar</button>
          </div>
        ))}
      </div>
      <div className="center separador">
        <button className="button2" onClick={() => navigate(-1)}>VOLVER</button>
      </div>
    </div>
    </div>
  );
}
