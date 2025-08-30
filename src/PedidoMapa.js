import React from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px"
};

function parseCoords(str) {
  if (!str) return null;
  const arr = str.split(",").map(Number);
  return arr.length === 2 ? { lat: arr[0], lng: arr[1] } : null;
}

function PedidoMapa({ origen, destino }) {
  const coordsOrigen = parseCoords(origen);
  const coordsDestino = parseCoords(destino);

  // Cambia aquí por tu lat/lng inicial preferido
  const center = coordsOrigen || { lat: 19.4326, lng: -99.1332 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCgkPgLGMRyiEYKKBzz6fNKBsVgukH9Mvk" // ← Cambia por tu API Key real
  });

  if (!coordsOrigen || !coordsDestino) {
    return <div className="mapa-error">No hay coordenadas de origen/destino disponibles.</div>;
  }

  return isLoaded ? (
    <div className="mapa-container">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <Marker position={coordsOrigen} label="Origen" />
        <Marker position={coordsDestino} label="Destino" />
        <Polyline
          path={[coordsOrigen, coordsDestino]}
          options={{ strokeColor: "#1e90e8", strokeWeight: 4 }}
        />
      </GoogleMap>
    </div>
  ) : <div>Cargando mapa...</div>;
}

export default React.memo(PedidoMapa);