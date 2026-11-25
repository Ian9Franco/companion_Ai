# Google Ads por MCP en Codex

Guías para conectar Google Ads con Codex de escritorio mediante el servidor local oficial de Google. Enfoque: Windows, PowerShell y consultas de solo lectura. Revisadas el 25/11/2026.

Estas guías son reutilizables: no contienen cuentas, correos, proyectos reales, rutas privadas ni credenciales. Copiar esta carpeta no otorga acceso. El propietario de Ads y quien administra Google Cloud deben autorizar cada alta o cambio.

## Elegí tu recorrido

| Situación | Seguí estos documentos |
| --- | --- |
| Primera conexión, sin proyecto Cloud | [01 Proyecto y acceso](01-proyecto-y-acceso.md) → [02 OAuth](02-oauth-en-google-cloud.md) → [03 Instalación](03-instalar-en-windows.md) → [04 Comprobación](04-comprobar-la-conexion.md) |
| Ya existe un proyecto aprobado | Confirmá el nivel y tus permisos en [01](01-proyecto-y-acceso.md); seguí por [02](02-oauth-en-google-cloud.md). |
| Misma cuenta, otra PC | [05 Otra PC o persona](05-otra-pc-otra-persona.md) → [03 Instalación](03-instalar-en-windows.md) → [04 Comprobación](04-comprobar-la-conexion.md). |
| Otra persona o cuenta Ads | [05 Otra PC o persona](05-otra-pc-otra-persona.md). |
| Algo falla o hay que renovar accesos | [06 Errores y rotación](06-errores-y-rotacion.md). |

El archivo [tools_config.yaml](tools_config.yaml) limita este servidor MCP a cuentas, búsquedas y metadatos. El alcance OAuth de Ads permite más operaciones; el límite de lectura lo impone este archivo y los permisos de la cuenta. No uses el servidor con su configuración predeterminada si necesitás impedir escrituras.

## Qué significa “conectado”

Hay que comprobar por separado: que la herramienta aparezca, que el servidor responda, que el usuario vea la cuenta correcta, que una consulta permitida funcione y qué identidad queda en la auditoría. [04](04-comprobar-la-conexion.md) explica cómo hacerlo sin crear registros de prueba.

## Alcance

Este recorrido usa el servidor local STDIO de Google Ads. No configura un servidor remoto de Cloud Run, ni Google Analytics. Para otros sistemas, revisá sus instrucciones propias. Los enlaces oficiales y su fecha de consulta están en [Fuentes](FUENTES.md).
