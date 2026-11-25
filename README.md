# Companion

Contenedor de CLIs compactas para agentes (Codex, Claude, Cursor). La salida es JSON chico y estable, para no gastar tokens recorriendo APIs, interfaces o este repositorio.

Meta Ads se usa por el MCP oficial (`https://mcp.facebook.com/ads`), ya declarado en `.cursor/mcp.json`. Google Ads y GA4 también tienen MCP oficial, y quedan sin conectar hasta esa etapa: sus schemas no entran en cada conversación.

## Qué corre el agente

```bash
npm run companion -- route "reporte semanal de meta"
npm run companion -- catalog
```

`route` responde qué usar. `catalog` lista todo. Sin comando, `catalog` es el default. `--pretty` indenta el JSON. Logs, si hace falta, van a stderr (`LOG_LEVEL=info`).

El MCP local expone una sola herramienta, `companion_route`, con el mismo criterio.

## Cómo se agrega una herramienta

1. Entrada en `src/registry/tools.ts` (id, cuándo, cuándo no, keywords distintivas).
2. Servicio o comando que devuelva el sobre `{ ok, tool, summary, data }`.
3. Test del router y, si hay cuentas, un caso con respuesta vacía y uno con error.
4. Lectura primero. Escritura recién con dry-run, confirmación y auditoría.

Keywords genéricas (`campaña`, `anuncios`, `reporte`) no van en el registro: harían que todo caiga en Meta.

## Meta

Completá el login de `meta-ads` en Cursor la primera vez. Pedile al agente resumen, período y cuenta, no el inventario entero. Si el OAuth no cierra, el camino documentado por Meta es un access token en un `mcp.json` local, con `ads_read` y sin commitear el secreto. Las reglas del Ads MCP en Business Suite pueden dejar la cuenta en solo lectura.

## Después

Google Ads y GA4 se conectan igual que Meta: el MCP del proveedor, no un clon nuestro. Las CLIs de este repo entran cuando una tarea repetida pide varios pasos (un digest semanal, una comparación, un cruce) y conviene devolverla en una sola llamada.

## Guías MCP para servicios autorizados

Guías reutilizables para conectar un agente compatible con MCP a servicios autorizados. Revisadas el 25/11/2026. No contienen credenciales, cuentas ni rutas privadas.

| Servicio | Guía | Conexión |
| --- | --- | --- |
| Google Ads | [Google Ads](google-ads/README.md) | Servidor local STDIO de Google; OAuth con gcloud/ADC. Incluye un YAML de herramientas de lectura. |
| Meta Ads | [Meta Ads](meta-ads/README.md) | Servidor remoto HTTP de Meta; OAuth con Facebook. Puede ofrecer lectura y acciones según permisos y cuenta. |
| FNGest | [FNGest](fngest/README.md) | Servidor MCP interno; alta y permisos individuales gestionados por el responsable. La URL y la autenticación no se publican aquí. |

### Para usar con otro agente o modelo

MCP es el protocolo; cada aplicación tiene su propia pantalla o archivo para registrar servidores. Elegí una que admita el transporte requerido, configurá la URL o el comando autorizado de la plataforma y completá la autenticación en tu propio usuario. Copiar estas guías no copia una sesión iniciada ni concede acceso.

Los ejemplos concretos de interfaz y CLI están escritos para Codex donde hay datos suficientes. En otra aplicación buscá su documentación de servidores MCP y verificá la conexión con una lectura mínima. No pegues tokens, secretos ni archivos de autenticación en chats o repositorios.

### Antes de cambiar datos

Confirmá servicio, recurso y cambio exacto. Que una herramienta de escritura figure disponible no demuestra permiso efectivo. Una lectura tampoco prueba escritura. Revisá si el cambio se aplica de inmediato o queda pendiente y comprobá el resultado mediante una lectura posterior cuando la operación esté autorizada.
