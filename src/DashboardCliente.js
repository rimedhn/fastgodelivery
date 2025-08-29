import React from "react";
import PedidoList from "./PedidoList";
import PedidoForm from "./PedidoForm";

function DashboardCliente({ token, onLogout }) {
  return (
    <div style={{maxWidth:900,margin:"40px auto",padding:20,border:"1px solid #ddd",borderRadius:10}}>
      <h2>Panel Cliente</h2>
      <button onClick={onLogout} style={{float:"right"}}>Cerrar sesión</button>
      <PedidoList token={token} soloCliente />
      <PedidoForm token={token} />
    </div>
  );
}
export default DashboardCliente;