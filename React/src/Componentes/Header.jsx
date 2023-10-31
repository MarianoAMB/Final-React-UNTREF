import { Link } from "react-router-dom";
import { routes } from "../Routes";

export default function Header() {
  return (
    <div>
    <div className="Header">
      <Link to={routes.historial}>📋</Link>
  </div>
  <h1 className="center separador">Seguros del hogar 🏡</h1>
  </div>
  )
}
