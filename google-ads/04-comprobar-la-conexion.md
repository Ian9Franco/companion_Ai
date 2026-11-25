# 04 — Comprobar la conexión sin modificar Ads

Realizá estas comprobaciones en el Codex y la PC de la persona autorizada. No crees campañas, notas, etiquetas, productos ni registros de prueba para validar conectividad.

## Prueba mínima

1. En Codex, escribí **/mcp** y verificá que aparece **google_ads**.
2. En un chat con acceso a esa herramienta, pedí: “Con google_ads, listá las cuentas directamente accesibles. No modifiques nada ni muestres más datos de los necesarios”.
3. Elegí una cuenta del resultado dentro de la sesión autorizada y pedí: “Con google_ads, obtené metadatos del recurso customer y luego consultá solo su ID para esta cuenta. No modifiques nada”.
4. Si usás MCC, indicá la administradora correcta para esa consulta. El ID va sin guiones. La lista de cuentas directamente accesibles puede mostrar la administradora y no todas sus cuentas hijas.
5. Registrá solo el resultado de la prueba: fecha, herramienta, tipo de recurso, lectura exitosa o categoría de error, y el límite observado. No copies respuestas completas ni IDs a una guía compartida.

## Qué demuestra cada resultado

| Comprobación | Evidencia válida |
| --- | --- |
| Herramienta disponible | google_ads figura en /mcp y aparecen las herramientas esperadas. |
| Conexión responde | Una llamada MCP devuelve resultado, no error de arranque. |
| Recurso permitido | La identidad autorizada ve una cuenta o recurso concreto. |
| Operación permitida | Una consulta de lectura a ese recurso responde correctamente. |
| Identidad de auditoría | Se confirma por el mecanismo de auditoría autorizado; una lectura no la acredita por sí sola. |

El [servidor oficial](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server) ofrece **customers_list_accessible_customers**, **metadata_get_resource_metadata** y **search_search** para estas lecturas. Los nombres pueden cambiar en versiones futuras: mirá la lista realmente cargada.

**Importante:** que el navegador de Google Ads funcione no prueba que OAuth local y MCP funcionen; que el MCP lea una cuenta tampoco demuestra permiso de escritura.
