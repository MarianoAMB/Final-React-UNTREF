import "./App.css";
import Formulario from "./Componentes/Formulario";
import Header from "./Componentes/Header";
import { Outlet, useOutlet } from 'react-router-dom';

function App() {
  const outlet = useOutlet()
  return (
    <main>
      <Header />
      {!outlet && <Formulario/>}      
      <Outlet />
    </main>
  );
}

export default App;
