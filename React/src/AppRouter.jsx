import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Historial from "./Componentes/Historial";
import { routes } from "./Routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.app} element={<App />} />
        <Route path={routes.historial} element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}
