import React, { useState } from "react";
import { apiRequest } from "./api";

function PedidoForm({ token }) {
  const [nombre_cliente, setNombreCliente] = useState("");
  const [telefono_cliente, setTelefonoCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [cords_origen, setCordsOrigen] = useState("");
  const [cords_destino, setCordsDestino] = useState("");
  const [notas, setNotas] = useState("");
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await apiRequest({
      action: "createPedido",
      token,
      nombre_cliente,
      telefono_cliente,
      servicio,
      descripcion,
      origen,
      destino,
      cords_origen,
      cords_destino,
      notas
    });
    if (data.ok) {
      setOk("Pedido creado!");
      setError("");
      setNombreCliente(""); setTelefonoCliente(""); setServicio(""); setDescripcion(""); setOrigen(""); setDestino(""); setCordsOrigen(""); setCordsDestino(""); setNotas("");
    } else {
      setOk("");
      setError(data.error || "Error al crear pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:30}}>
      <h3>Crear Pedido</h3>
      <input value={nombre_cliente} onChange={e => setNombreCliente(e.target.value)} placeholder="Nombre Cliente" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={telefono_cliente} onChange={e => setTelefonoCliente(e.target.value)} placeholder="Teléfono Cliente" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={servicio} onChange={e => setServicio(e.target.value)} placeholder="Servicio" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={origen} onChange={e => setOrigen(e.target.value)} placeholder="Origen" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={destino} onChange={e => setDestino(e.target.value)} placeholder="Destino" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={cords_origen} onChange={e => setCordsOrigen(e.target.value)} placeholder="Coordenadas Origen" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={cords_destino} onChange={e => setCordsDestino(e.target.value)} placeholder="Coordenadas Destino" style={{width:"100%",marginBottom:10,padding:8}} />
      <input value={notas} onChange={e => setNotas(e.target.value)} placeholder="Notas" style={{width:"100%",marginBottom:10,padding:8}} />
      <button type="submit" style={{width:"100%",padding:10}}>Crear</button>
      {ok && <div style={{color:"green",marginTop:8}}>{ok}</div>}
      {error && <div style={{color:"red",marginTop:8}}>{error}</div>}
    </form>
  );
}
export default PedidoForm;