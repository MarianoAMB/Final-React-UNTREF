import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Historial.module.css"; 

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
    <div className="center div-cotizador">
      <div className={styles["historial-grid"]}>
        <div className={styles["historial-header"]}>Fecha</div>
        <div className={styles["historial-header"]}>Propiedad</div>
        <div className={styles["historial-header"]}>Ubicación</div>
        <div className={styles["historial-header"]}>Metros</div>
        <div className={styles["historial-header"]}>Precio</div>
        <div></div>

        {cotizaciones.map((cotizacion, index) => (
            <div key={index} className={styles["historial-item"]}>
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
        <button className="button button-outline" onClick={() => navigate(-1)}>VOLVER</button>
      </div>
    </div>
  );
}
