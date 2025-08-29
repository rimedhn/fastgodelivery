import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

function PedidoList({ token, soloCliente, soloRepartidor }) {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      let action = "getPedidos";
      if (soloCliente) action = "getPedidosCliente";
      if (soloRepartidor) action = "getPedidosRepartidor";
      const data = await apiRequest({
        action,
        token
      });
      if (data.error) setError(data.error);
      else setPedidos(data.pedidos || []);
    };
    fetchPedidos();
  }, [token, soloCliente, soloRepartidor]);

  return (
    <div style={{marginBottom:30}}>
      <h3>Lista de Pedidos</h3>
      {error && <div style={{color:"red"}}>{error}</div>}
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:"12px"}}>
        <thead>
          <tr>
            <th>id_pedido</th>
            <th>nombre_cliente</th>
            <th>telefono_cliente</th>
            <th>servicio</th>
            <th>descripcion</th>
            <th>origen</th>
            <th>destino</th>
            <th>cords_origen</th>
            <th>cords_destino</th>
            <th>estado</th>
            <th>fecha</th>
            <th>notas</th>
            <th>driver_name</th>
            <th>driver_contact</th>
            <th>historial</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p, i) => (
            <tr key={i}>
              <td>{p.id_pedido}</td>
              <td>{p.nombre_cliente}</td>
              <td>{p.telefono_cliente}</td>
              <td>{p.servicio}</td>
              <td>{p.descripcion}</td>
              <td>{p.origen}</td>
              <td>{p.destino}</td>
              <td>{p.cords_origen}</td>
              <td>{p.cords_destino}</td>
              <td>{p.estado}</td>
              <td>{p.fecha}</td>
              <td>{p.notas}</td>
              <td>{p.driver_name}</td>
              <td>{p.driver_contact}</td>
              <td>{p.historial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PedidoList;