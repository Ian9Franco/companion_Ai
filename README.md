# Integraciones por MCP

Guías reutilizables para conectar un agente compatible con MCP a servicios autorizados. Revisadas el 25/11/2026. No contienen credenciales, cuentas ni rutas privadas.

| Servicio | Guía | Conexión |
| --- | --- | --- |
| Google Ads | [Google Ads](google-ads/README.md) | Servidor local STDIO de Google; OAuth con gcloud/ADC. Incluye un YAML de herramientas de lectura. |
| Meta Ads | [Meta Ads](meta-ads/README.md) | Servidor remoto HTTP de Meta; OAuth con Facebook. Puede ofrecer lectura y acciones según permisos y cuenta. |
| FNGest | [FNGest](fngest/README.md) | Servidor MCP interno; alta y permisos individuales gestionados por el responsable. La URL y la autenticación no se publican aquí. |

## Para usar con otro agente o modelo

MCP es el protocolo; cada aplicación tiene su propia pantalla o archivo para registrar servidores. Elegí una que admita el transporte requerido, configurá la URL o el comando autorizado de la plataforma y completá la autenticación en tu propio usuario. Copiar estas guías no copia una sesión iniciada ni concede acceso.

Los ejemplos concretos de interfaz y CLI están escritos para Codex donde hay datos suficientes. En otra aplicación buscá su documentación de servidores MCP y verificá la conexión con una lectura mínima. No pegues tokens, secretos ni archivos de autenticación en chats o repositorios.

## Antes de cambiar datos

Confirmá servicio, recurso y cambio exacto. Que una herramienta de escritura figure disponible no demuestra permiso efectivo. Una lectura tampoco prueba escritura. Revisá si el cambio se aplica de inmediato o queda pendiente y comprobá el resultado mediante una lectura posterior cuando la operación esté autorizada.
