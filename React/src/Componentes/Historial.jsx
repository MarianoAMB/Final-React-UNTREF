import React from 'react'

export default function Historial() {
  return (
    <div className=" center div-cotizador">
        <table>
            <thead>
                <tr>
                    <th>Fecha de cotización</th>
                    <th>Propiedad</th>
                    <th>Ubicación</th>
                    <th>Metros cuadrados</th>
                    <th>Póliza mensual</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Aquí</td>
                    <td>verás</td>
                    <td>las</td>
                    <td>cotizaciones</td>
                    <td>realizadas</td>
                </tr>
            </tbody>
        </table>
        <div className="center separador">
            <a  href="index.html"><button className="button button-outline">VOLVER</button></a>
        </div>
    </div>
  )
}


