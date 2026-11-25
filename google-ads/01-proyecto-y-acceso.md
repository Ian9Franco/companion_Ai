# 01 — Proyecto de Google Cloud y acceso a Ads

Tiempo habitual: unos minutos, más la eventual revisión de Google. Necesitás permiso para administrar el proyecto Cloud y acceso autorizado a la cuenta de Google Ads.

## Antes de crear nada

1. Preguntá si ya existe un proyecto Cloud aprobado para Google Ads API. Si existe, usalo solamente con autorización del responsable. El nivel de API pertenece al proyecto que crea el cliente OAuth.
2. Elegí la cuenta de Google que autorizará el MCP. Esa cuenta debe tener acceso a Ads; tener acceso a Cloud no lo demuestra.
3. Decidí si la app OAuth será solo para una persona o para varias. Antes de configurarla, leé la elección de audiencia en [02 OAuth](02-oauth-en-google-cloud.md). El modo Personal no se puede convertir luego en Externo.

## Proyecto nuevo

1. Abrí [Crear proyecto en Google Cloud](https://console.cloud.google.com/projectcreate) y elegí la cuenta de Google correcta.
2. Poné un nombre reconocible y crealo. Anotá el ID del proyecto en tu gestión privada; los comandos posteriores piden ese valor. No lo agregues a una guía compartida.
3. Abrí la [biblioteca de APIs](https://console.cloud.google.com/apis/library/googleads.googleapis.com), comprobá el proyecto seleccionado arriba y habilitá **Google Ads API**. Revisá los términos que presente Google.
4. Abrí la [página de acceso de Google Ads API](https://console.cloud.google.com/google/ads-apis/overview). Al habilitarla, un proyecto nuevo suele quedar en **Prueba**.
5. Si vas a consultar cuentas reales, en esa página expandí **Actualizar nivel de acceso**, comprobá que el siguiente nivel sea **Explorador** y enviá la solicitud. Volvé a verificar que el nivel actual cambió a Explorador antes de usar producción. La solicitud puede pasar por revisión.
6. Entrá a [Google Ads](https://ads.google.com/) con la cuenta que usarás para OAuth y comprobá que puede abrir la cuenta deseada. Si no puede, el propietario o administrador de Ads debe concederle acceso desde la interfaz de Ads.

**Prueba** solo sirve para cuentas de prueba. **Explorador** permite cuentas reales, con cuota de 2.880 operaciones diarias sobre producción según la [política vigente de Google](https://developers.google.com/google-ads/api/docs/api-policy/access-levels). Para uso más amplio existen Básico y Estándar.

## Si usás una cuenta administradora (MCC)

La cuenta que autoriza puede acceder a clientes a través de una administradora. En algunas consultas hará falta el **login customer ID** de esa administradora: diez dígitos, sin guiones. Guardalo en el entorno autorizado, no en esta carpeta. Si el usuario tiene acceso directo a la cuenta objetivo, puede omitirse. [Modelo de acceso de Google Ads](https://developers.google.com/google-ads/api/docs/oauth/access-model).

## Sobre las “API keys”

El flujo local de esta guía usa OAuth y credenciales ADC. No pide una API key ni un developer token: Google retiró los developer tokens para este flujo en septiembre de 2026. El proyecto Cloud del cliente OAuth determina el nivel de acceso. [Guía oficial del MCP de Ads](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server).
