import React, { useState } from "react";
import { apiRequest } from "./api";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await apiRequest({
      action: "login",
      usuario,
      clave
    });
    if (data.ok) {
      onLogin(data.token, data.tipo);
      setError("");
    } else {
      setError(data.error || "Error de login");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{marginBottom:30}}>
      <h2>Login</h2>
      <input value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={clave} onChange={e => setClave(e.target.value)} type="password" placeholder="Clave" style={{width:"100%",marginBottom:10,padding:8}} />
      <button style={{width:"100%",padding:10}} type="submit">Login</button>
      {error && <div style={{color:"red",marginTop:8}}>{error}</div>}
    </form>
  );
}
export default Login;