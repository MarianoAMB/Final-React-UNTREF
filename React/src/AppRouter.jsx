import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Historial from "./Historial";
import { routes } from "./Routes";
import Error from "./Componentes/Error";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.app} element={<App />}>
          <Route path={routes.historial} element={<Historial />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
