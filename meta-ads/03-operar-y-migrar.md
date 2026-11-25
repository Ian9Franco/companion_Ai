# 03 — Cambios, otra PC y problemas

## Si querés pausar o cambiar presupuesto

1. Indicá cuenta, campaña y cambio pedido. El agente debe leer la entidad exacta y confirmar estado, presupuesto, moneda y nivel donde se administra el presupuesto (campaña o conjunto).
2. Revisá el efecto esperado. En Meta, una pausa puede aplicarse en vivo; otras ediciones pueden quedar en borrador y requerir publicación. No interpretes “herramienta respondió” como “cambio en vivo”.
3. Con la autorización para esa operación, ejecutá solo el cambio pedido. Si queda en borrador, informalo y publicá únicamente cuando el usuario lo pida.
4. Volvé a leer la entidad para verificar el estado o presupuesto efectivo. Si la lectura no confirma el cambio, informá el límite y revisá en Ads Manager.

## Otra PC o persona

Repetí [01](01-conectar.md) en el agente de esa PC y autenticá con el usuario de Facebook que usará la conexión. No copies cookies, tokens ni perfiles. El administrador de Meta debe conceder a cada persona los permisos de la cuenta pertinente. La conexión de una persona no demuestra acceso de otra.

## Otra cuenta publicitaria

Si el mismo usuario ya tiene acceso, elegí el ID de la cuenta en la operación; no hace falta volver a crear el servidor. Si la cuenta no aparece, verificá el usuario que autorizó OAuth, sus permisos y la disponibilidad del MCP para esa cuenta.

## Si algo falla

| Síntoma | Revisá |
| --- | --- |
| Servidor ausente | URL, transporte HTTP, registro y reinicio del agente. |
| OAuth vencido o pendiente | Volvé a autenticar desde el cliente MCP con el usuario correcto. |
| Cuenta ausente | Acceso del usuario en Meta y habilitación del MCP para esa cuenta. |
| Lectura funciona, edición rechazada | Rol, estado de cuenta, permisos de la operación y restricciones del objeto. |
| Cambio figura en borrador | Verificá el borrador y su publicación antes de informar que está activo. |

[Meta for Business](https://es-la.facebook.com/business/tools/ads-mcp-server) · [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp).
