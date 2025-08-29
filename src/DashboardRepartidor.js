import React from "react";
import PedidoList from "./PedidoList";

function DashboardRepartidor({ token, onLogout }) {
  return (
    <div style={{maxWidth:900,margin:"40px auto",padding:20,border:"1px solid #ddd",borderRadius:10}}>
      <h2>Panel Repartidor</h2>
      <button onClick={onLogout} style={{float:"right"}}>Cerrar sesión</button>
      <PedidoList token={token} soloRepartidor />
    </div>
  );
}
export default DashboardRepartidor;