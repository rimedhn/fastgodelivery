import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

function UsuarioList({ token }) {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await apiRequest({
        action: "getUsuarios",
        token
      });
      if (data.error) setError(data.error);
      else setUsuarios(data.usuarios || []);
    };
    fetchUsuarios();
  }, [token]);

  return (
    <div style={{marginBottom:30}}>
      <h3>Lista de Usuarios</h3>
      {error && <div style={{color:"red"}}>{error}</div>}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>id_usuario</th>
            <th>nombre</th>
            <th>usuario</th>
            <th>tipo</th>
            <th>estado</th>
            <th>fecha_registro</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={i}>
              <td>{u.id_usuario}</td>
              <td>{u.nombre}</td>
              <td>{u.usuario}</td>
              <td>{u.tipo}</td>
              <td>{u.estado}</td>
              <td>{u.fecha_registro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UsuarioList;