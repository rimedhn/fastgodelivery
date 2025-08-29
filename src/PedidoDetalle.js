import React, { useState } from "react";
import PedidoMapa from "./PedidoMapa";
import "./PedidoList.css";

function PedidoDetalle({ pedido, token, onClose }) {
  const [estado, setEstado] = useState(pedido.estado);
  const [mensaje, setMensaje] = useState("");

  const actualizarEstado = async (nuevoEstado) => {
    const res = await window.apiRequest({
      action: "actualizarEstadoPedido",
      token,
      id_pedido: pedido.id_pedido,
      estado: nuevoEstado
    });
    if (res.ok) {
      setEstado(nuevoEstado);
      setMensaje("Estado actualizado correctamente.");
    } else {
      setMensaje(res.error || "Error al actualizar estado");
    }
  };

  return (
    <div className="detalle-pedido">
      <h2>Detalle del Pedido</h2>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <div className="detalle-datos">
        <p><b>ID:</b> {pedido.id_pedido}</p>
        <p><b>Cliente:</b> {pedido.nombre_cliente}</p>
        <p><b>Teléfono:</b> {pedido.telefono_cliente}</p>
        <p><b>Servicio:</b> {pedido.servicio}</p>
        <p><b>Descripción:</b> {pedido.descripcion}</p>
        <p><b>Origen:</b> {pedido.origen}</p>
        <p><b>Destino:</b> {pedido.destino}</p>
        <p><b>Estado:</b> <span className={`estado-tag ${estado.toLowerCase()}`}>{estado}</span></p>
        <p><b>Fecha:</b> {new Date(pedido.fecha).toLocaleString()}</p>
        <p><b>Notas:</b> {pedido.notas}</p>
        <p><b>Repartidor:</b> {pedido.driver_name}</p>
      </div>
      <PedidoMapa origen={pedido.cords_origen} destino={pedido.cords_destino} />
      <div className="acciones-detalle">
        {estado !== "Entregado" && (
          <button className="btn-estado entregue" onClick={() => actualizarEstado("Entregado")}>
            Marcar como Entregado
          </button>
        )}
        {estado !== "Cancelado" && (
          <button className="btn-estado cancelado" onClick={() => actualizarEstado("Cancelado")}>
            Cancelar
          </button>
        )}
        <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default PedidoDetalle;