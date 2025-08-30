import React, { useEffect, useState } from "react";
import "./PedidoList.css";
import { apiRequest } from "../api/api"; // Asegúrate de que la ruta sea correcta

function PedidoList({ token, soloRepartidor, onVerDetalle }) {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      let action = "getPedidos";
      if (soloRepartidor) action = "getPedidosRepartidor";
      const res = await apiRequest({ action, token }); // <-- Ya no uses window.apiRequest
      if (res.error) setError(res.error);
      else setPedidos(res.pedidos || []);
    };
    fetchPedidos();
  }, [token, soloRepartidor]);

  const tomarPedido = async (id_pedido) => {
    const res = await apiRequest({ action: "asignarPedido", token, id_pedido }); // <-- Aquí también
    if (res.ok) {
      alert("¡Pedido asignado correctamente!");
      window.location.reload();
    } else {
      alert(res.error || "Error al tomar el pedido.");
    }
  };

  const estadoClass = estado => {
    const e = estado ? estado.toLowerCase() : "";
    if (e.includes("pendiente")) return "estado-pendiente";
    if (e.includes("en proceso")) return "estado-proceso";
    if (e.includes("entregado")) return "estado-entregado";
    if (e.includes("cancelado")) return "estado-cancelado";
    return "";
  };

  return (
    <div className="pedidos-list-container">
      <h3>Lista de Pedidos</h3>
      {error && <div className="error">{error}</div>}
      <div className="tabla-wrapper">
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
              <th>Repartidor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={11} className="sin-pedidos">No hay pedidos disponibles</td>
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
                  <td data-label="Repartidor">{p.driver_name}</td>
                  <td data-label="Acciones">
                    <button className="btn-ver" onClick={() => onVerDetalle(p)}>Ver detalle</button>
                    {soloRepartidor && !p.driver_name && (
                      <button className="btn-tomar" onClick={() => tomarPedido(p.id_pedido)}>Tomar pedido</button>
                    )}
                  </td>
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