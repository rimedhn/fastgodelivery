# FASTGODELIVERY

Frontend en React para GitHub Pages.  
Backend: Apps Script Web App.

## Estructura de tablas en Google Sheets

### Usuarios
| id_usuario | nombre | usuario | clave | tipo | estado | fecha_registro |

### Servicios
| id | nombre | categoria | descripcion | precio_base | horario |

### Pedidos
| id_pedido | nombre_cliente | telefono_cliente | servicio | descripcion | origen | destino | cords_origen | cords_destino | estado | fecha | notas | driver_name | driver_contact | historial |

### Horario
| dia | hora_inicio | hora_fin | activo |

---

## Cómo desplegar

1. Instala dependencias:
   ```
   npm install
   ```

2. Actualiza `src/api.js` con tu deployment ID de Apps Script.

3. Despliega a GitHub Pages:
   ```
   npm run deploy
   ```

4. Accede en: https://rimedhn.github.io/fastgodelivery

---