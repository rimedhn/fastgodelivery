import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

function ServicioList({ token }) {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServicios = async () => {
      const data = await apiRequest({
        action: "getServicios",
        token
      });
      if (data.error) setError(data.error);
      else setServicios(data.servicios || []);
    };
    fetchServicios();
  }, [token]);

  return (
    <div style={{marginBottom:30}}>
      <h3>Servicios</h3>
      {error && <div style={{color:"red"}}>{error}</div>}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>categoria</th>
            <th>descripcion</th>
            <th>precio_base</th>
            <th>horario</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s, i) => (
            <tr key={i}>
              <td>{s.id}</td>
              <td>{s.nombre}</td>
              <td>{s.categoria}</td>
              <td>{s.descripcion}</td>
              <td>{s.precio_base}</td>
              <td>{s.horario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ServicioList;