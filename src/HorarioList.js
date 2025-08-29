import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

function HorarioList({ token }) {
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHorarios = async () => {
      const data = await apiRequest({
        action: "getHorarios",
        token
      });
      if (data.error) setError(data.error);
      else setHorarios(data.horarios || []);
    };
    fetchHorarios();
  }, [token]);

  return (
    <div style={{marginBottom:30}}>
      <h3>Horarios</h3>
      {error && <div style={{color:"red"}}>{error}</div>}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>dia</th>
            <th>hora_inicio</th>
            <th>hora_fin</th>
            <th>activo</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h, i) => (
            <tr key={i}>
              <td>{h.dia}</td>
              <td>{h.hora_inicio}</td>
              <td>{h.hora_fin}</td>
              <td>{h.activo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default HorarioList;