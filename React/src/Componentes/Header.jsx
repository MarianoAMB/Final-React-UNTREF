import { Link } from "react-router-dom";
import { routes } from "../Routes";

export default function Header() {
  return (
    <div>
    <div className="Header">
    <a href="historial.html">
      <span title="Ver Historial"><Link to={routes.historial}></Link>📋</span>
    </a>
  </div>
  <h1 className="center separador">Seguros del hogar 🏡</h1>
  </div>
  )
}
