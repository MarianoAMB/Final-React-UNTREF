import { useState, useEffect } from "react";
import axios from "axios";

export default function Formulario() {
  const [formData, setFormData] = useState({
    propiedadSeleccionada: "",
    ubicacionSeleccionada: "",
    metrosCuadrados: 20,
    precioEstimado: 0,
  });
  const [datosPropiedad, setDatosPropiedad] = useState([]);
  const [datosUbicacion, setDatosUbicacion] = useState([]);

  useEffect(() => {
    axios("https://653831aaa543859d1bb14d53.mockapi.io/propiedades")
      .then((res) => {
        setDatosPropiedad(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos de propiedades", error);
      });
    axios("https://653831aaa543859d1bb14d53.mockapi.io/ubicaciones")
      .then((res) => {
        setDatosUbicacion(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos de propiedades", error);
      });
  }, []);

  const cotizador = () => {
    const { propiedadSeleccionada, ubicacionSeleccionada, metrosCuadrados } =
      formData;

    const propiedadSeleccionadaData = datosPropiedad.find(
      (propiedad) => propiedad.tipo === propiedadSeleccionada
    );

    const ubicacionSeleccionadaData = datosUbicacion.find(
      (ubicacion) => ubicacion.tipo === ubicacionSeleccionada
    );

    if (propiedadSeleccionadaData && ubicacionSeleccionadaData) {
      const costoM2 = 35.86;
      const factorPropiedad = propiedadSeleccionadaData.factor;
      const factorUbicacion = ubicacionSeleccionadaData.factor;
      const precioEstimado =
        costoM2 * factorPropiedad * factorUbicacion * metrosCuadrados;

      setFormData({ ...formData, precioEstimado });
    } else {
      alert("Por favor selecciona una propiedad y una ubicación");
    }
  };

  const guardarEnHistorial = () => {
    const cotizacionesGuardadas =
      JSON.parse(localStorage.getItem("cotizaciones")) || [];

    cotizacionesGuardadas.push({
      fecha: new Date().toLocaleString(),
      propiedad: formData.propiedadSeleccionada,
      ubicacion: formData.ubicacionSeleccionada,
      metrosCuadrados: formData.metrosCuadrados,
      precio: formData.precioEstimado,
    });

    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));
  };

  return (
    <div className="center div-cotizador">
      <h2 className="center separador">Completa los datos solicitados</h2>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select
        value={formData.propiedadSeleccionada}
        onChange={(e) => setFormData({ ...formData, propiedadSeleccionada: e.target.value })}
      >
        <option value="" disabled>
          ...
        </option>
        {datosPropiedad.map((propiedad) => (
          <option key={propiedad.id} value={propiedad.tipo}>
            {propiedad.tipo}
          </option>
        ))}
      </select>
      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select
        value={formData.ubicacionSeleccionada}
        onChange={(e) => setFormData({ ...formData, ubicacionSeleccionada: e.target.value })}
      >
        <option value="" disabled>
          ...
        </option>
        {datosUbicacion.map((ubicacion) => (
          <option key={ubicacion.id} value={ubicacion.tipo}>
            {ubicacion.tipo}
          </option>
        ))}
      </select>
      <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input
        type="number"
        value={formData.metrosCuadrados}
        onChange={(e) => setFormData({ ...formData, metrosCuadrados: parseFloat(e.target.value) || 0 })}
        min="20"
        max="500"
        required
      />
      <div className="center separador">
        <button className="button button-outline" onClick={cotizador}>
          Cotizar
        </button>
      </div>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ {formData.precioEstimado.toFixed(2)}{" "}
        </p>
        <button
          className="guardar ocultar"
          title="Guardar en historial"
          onClick={guardarEnHistorial}
        >
          💾 Guardar cotización
        </button>
      </div>
    </div>
  );
}
