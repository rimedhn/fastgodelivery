import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import DashboardAdmin from "./DashboardAdmin";
import DashboardStaff from "./DashboardStaff";
import DashboardCliente from "./DashboardCliente";
import DashboardRepartidor from "./DashboardRepartidor";

function App() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  // Leer datos de localStorage al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedType = localStorage.getItem("userType");
    if (savedToken && savedType) {
      setToken(savedToken);
      setUserType(savedType);
    }
  }, []);

  // Guardar datos en localStorage tras login
  const handleLogin = (token, tipo) => {
    setToken(token);
    setUserType(tipo);
    localStorage.setItem("token", token);
    localStorage.setItem("userType", tipo);
  };

  const handleLogout = () => {
    setToken(null);
    setUserType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  if (!token) {
    return (
      <div style={{maxWidth:600,margin:"40px auto",padding:20,border:"1px solid #ddd",borderRadius:10}}>
        <h1>FASTGODELIVERY</h1>
        <Login onLogin={handleLogin} />
        <Register />
      </div>
    );
  }

  let dashboard = null;
  if (userType === "Admin") dashboard = <DashboardAdmin token={token} onLogout={handleLogout} />;
  else if (userType === "Staff") dashboard = <DashboardStaff token={token} onLogout={handleLogout} />;
  else if (userType === "Cliente") dashboard = <DashboardCliente token={token} onLogout={handleLogout} />;
  else if (userType === "Repartidor") dashboard = <DashboardRepartidor token={token} onLogout={handleLogout} />;
  else dashboard = <div>Error: Tipo de usuario desconocido <button onClick={handleLogout}>Volver a login</button></div>;

  return dashboard;
}

export default App;