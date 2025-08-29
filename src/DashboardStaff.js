import React from "react";
import UsuarioList from "./UsuarioList";
import ServicioList from "./ServicioList";
import PedidoList from "./PedidoList";
import PedidoForm from "./PedidoForm";
import HorarioList from "./HorarioList";

function DashboardStaff({ token, onLogout }) {
  return (
    <div style={{maxWidth:900,margin:"40px auto",padding:20,border:"1px solid #ddd",borderRadius:10}}>
      <h2>Panel Staff</h2>
      <button onClick={onLogout} style={{float:"right"}}>Cerrar sesión</button>
      <UsuarioList token={token} />
      <ServicioList token={token} />
      <PedidoList token={token} />
      <PedidoForm token={token} />
      <HorarioList token={token} />
    </div>
  );
}
export default DashboardStaff;