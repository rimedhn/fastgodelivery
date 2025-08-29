import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import DashboardAdmin from "./DashboardAdmin";
import DashboardStaff from "./DashboardStaff";
import DashboardCliente from "./DashboardCliente";
import DashboardRepartidor from "./DashboardRepartidor";

function App() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  // Recuperar tipo de usuario tras login
  const handleLogin = (token, tipo) => {
    setToken(token);
    setUserType(tipo);
  };

  const handleLogout = () => {
    setToken(null);
    setUserType(null);
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

  return dashboard;
}

export default App;