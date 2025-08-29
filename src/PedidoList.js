import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";
import "./PedidoList.css"; // <-- Importa el CSS

function PedidoList({ token, soloCliente, soloRepartidor }) {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      let action = "getPedidos";
      if (soloCliente) action = "getPedidosCliente";
      if (soloRepartidor) action = "getPedidosRepartidor";
      const data = await apiRequest({ action, token });
      if (data.error) setError(data.error);
      else setPedidos(data.pedidos || []);
    };
    fetchPedidos();
  }, [token, soloCliente, soloRepartidor]);

  // función para aplicar clase según estado
  const estadoClass = estado => {
    const e = estado ? estado.toLowerCase() : "";
    if (e.includes("pendiente")) return "estado-pendiente";
    if (e.includes("entregado")) return "estado-entregado";
    if (e.includes("cancelado")) return "estado-cancelado";
    return "";
  };

  return (
    <div style={{marginBottom:30}}>
      <h3>Lista de Pedidos</h3>
      {error && <div style={{color:"red"}}>{error}</div>}
      <div style={{overflowX:"auto"}}>
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Notas</th>
              <th>Repartidor</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={11} style={{padding:"16px",textAlign:"center",color:"#888"}}>No hay pedidos disponibles</td>
              </tr>
            ) : (
              pedidos.map((p, i) => (
                <tr key={i}>
                  <td data-label="ID">{p.id_pedido}</td>
                  <td data-label="Cliente">{p.nombre_cliente}</td>
                  <td data-label="Teléfono">{p.telefono_cliente}</td>
                  <td data-label="Servicio">{p.servicio}</td>
                  <td data-label="Descripción">{p.descripcion}</td>
                  <td data-label="Origen">{p.origen}</td>
                  <td data-label="Destino">{p.destino}</td>
                  <td data-label="Estado" className={estadoClass(p.estado)}>{p.estado}</td>
                  <td data-label="Fecha">{new Date(p.fecha).toLocaleString()}</td>
                  <td data-label="Notas">{p.notas}</td>
                  <td data-label="Repartidor">{p.driver_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PedidoList;