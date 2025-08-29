import React, { useState } from "react";
import { apiRequest } from "./api";

function Register() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [tipo, setTipo] = useState("Cliente");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await apiRequest({
      action: "register",
      nombre,
      usuario,
      clave,
      tipo
    });
    if (data.ok) {
      setOk("¡Registrado correctamente!");
      setError("");
      setNombre(""); setUsuario(""); setClave(""); setTipo("Cliente");
    } else {
      setError(data.error || "Error de registro");
      setOk("");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre Completo" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={clave} onChange={e => setClave(e.target.value)} type="password" placeholder="Clave" style={{width:"100%",marginBottom:10,padding:8}} />
      <select value={tipo} onChange={e => setTipo(e.target.value)} style={{width:"100%",marginBottom:10,padding:8}}>
        <option value="Cliente">Cliente</option>
        <option value="Repartidor">Repartidor</option>
        <option value="Admin">Admin</option>
        <option value="Staff">Staff</option>
      </select>
      <button style={{width:"100%",padding:10}} type="submit">Registrarse</button>
      {error && <div style={{color:"red",marginTop:8}}>{error}</div>}
      {ok && <div style={{color:"green",marginTop:8}}>{ok}</div>}
    </form>
  );
}
export default Register;