import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { routes } from "../Routes";
import Swal from "sweetalert2";

export default function Formulario() {
  const [formData, setFormData] = useState({
    propiedadSeleccionada: "",
    ubicacionSeleccionada: "",
    metrosCuadrados: 20,
    precioEstimado: 0,
    costoM2: 35.86,
    factorProp: "",
    factorUbi: "",
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

  const cotizarYGuardar = () => {
    if (
      formData.propiedadSeleccionada &&
      formData.ubicacionSeleccionada &&
      formData.metrosCuadrados >= 20 &&
      formData.metrosCuadrados <= 500
    ) {
      const precioEstimado =
        formData.costoM2 *
        formData.factorProp *
        formData.factorUbi *
        formData.metrosCuadrados;

      setFormData({ ...formData, precioEstimado });

      const cotizacionesGuardadas =
        JSON.parse(localStorage.getItem("cotizaciones")) || [];

      cotizacionesGuardadas.push({
        fecha: new Date().toLocaleString(),
        propiedad: formData.propiedadSeleccionada,
        ubicacion: formData.ubicacionSeleccionada,
        metrosCuadrados: formData.metrosCuadrados,
        precio: Number(precioEstimado), // Convertir a número
      });

      localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No capo',
        text: 'Crack, ¿no te das cuenta que te faltan cosas o el número de metros cuadrados no está en el rango permitido (20-500)?',
      });
    }
  };

  const handleSelectPropiedad = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    setFormData({
      ...formData,
      propiedadSeleccionada: selectedOption.textContent,
      factorProp: selectedOption.value,
    });
  };

  const handleSelectUbicacion = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    setFormData({
      ...formData,
      ubicacionSeleccionada: selectedOption.textContent,
      factorUbi: selectedOption.value,
    });
  };

  return (
    <div className="center div-cotizador">
      <h2 className="center separador">Completa los datos solicitados</h2>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select id="propiedad" className="Option" onChange={handleSelectPropiedad}>
        <option selected disabled>
          ...
        </option>
        {datosPropiedad.map((propiedad) => (
          <option key={propiedad.tipo} value={propiedad.factor}>
            {propiedad.tipo}
          </option>
        ))}
      </select>

      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select id="ubicacion" className="Option" onChange={handleSelectUbicacion}>
        <option selected disabled>
          ...
        </option>
        {datosUbicacion.map((ubicacion) => (
          <option key={ubicacion.tipo} value={ubicacion.factor}>
            {ubicacion.tipo}
          </option>
        ))}
      </select>
      <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input
        className="Option"
        type="number"
        value={formData.metrosCuadrados}
        onChange={(e) => {
          setFormData({
            ...formData,
            metrosCuadrados: parseFloat(e.target.value) || 0,
          });
        }}
        min="20"
        max="500"
        required
      />

      <div className="center separador botonera">
        <button className="button button-outline" onClick={cotizarYGuardar}>
          Cotizar y Guardar
        </button>
        <Link to={routes.historial}>
          <button className="button button-outline">Historial</button>
        </Link>
      </div>

      <div className="center separador">
        <p className="importe">
          Precio estimado: $ {formData.precioEstimado.toFixed(2)}{" "}
        </p>
      </div>
    </div>
  );
}
