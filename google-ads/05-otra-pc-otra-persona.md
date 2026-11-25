# 05 — Otra PC, otra persona o cuenta

Copiar esta carpeta solo copia instrucciones y el YAML de lectura. Cada PC necesita instalación local y cada usuario necesita su propia autorización. El acceso al proyecto Cloud y el acceso a Ads son permisos distintos.

## Misma persona, otra PC

1. Confirmá con el responsable que seguirás usando el mismo proyecto Cloud y que conserva nivel Explorador o superior.
2. En [Clientes OAuth](https://console.cloud.google.com/auth/clients), preferí crear un cliente de escritorio dedicado a la nueva PC. Descargá su JSON en el momento y guardalo de forma privada en esa PC. Así podés retirar esa credencial sin afectar otra máquina.
3. Seguí [03 Instalación](03-instalar-en-windows.md) en la nueva PC: instalá programas, autorizá con gcloud y registrá el MCP local.
4. Seguí [04 Comprobación](04-comprobar-la-conexion.md). El éxito en la PC anterior no reemplaza esta prueba.

No copies el archivo ADC ni un perfil entero de gcloud entre PCs. Si decidís reutilizar el mismo JSON OAuth, transferilo solo por un canal privado aprobado; compartirlo aumenta el impacto de una filtración.

## Otra persona, mismo proyecto

1. El propietario de Google Ads le concede a esa persona el rol necesario en la cuenta o administradora correcta.
2. El responsable Cloud confirma que el proyecto y su nivel de API permiten ese uso. Acceso a Ads no concede administración de Cloud.
3. Si OAuth está en **Externo / Prueba**, agregá su cuenta Google en [Público → Usuarios de prueba](https://console.cloud.google.com/auth/audience). En modo Personal no se puede añadir otra persona: hace falta otro proyecto y otra configuración de audiencia.
4. Creá un cliente OAuth de escritorio para su entorno o entregá credenciales por un mecanismo privado aprobado. Esa persona ejecuta gcloud en su PC y valida su propia sesión.
5. Si se necesitan datos de clientes bajo MCC, usá el login customer ID correcto. [Modelo de acceso de Ads](https://developers.google.com/google-ads/api/docs/oauth/access-model).

## Otro proyecto de Google Cloud

El nuevo proyecto debe tener Ads API habilitada y nivel suficiente para cuentas reales. Creá el OAuth **en ese proyecto**: el nivel de API se determina por el proyecto dueño del cliente OAuth. Repetí la autorización ADC en cada PC y cambiá el valor **GOOGLE_CLOUD_PROJECT** del registro MCP. Para registrar de nuevo solo esta entrada, Codex documenta **codex mcp remove google_ads** y luego **codex mcp add google_ads ...** con los valores nuevos. Quitarlo de Codex no revoca permisos en Google. [Acceso de la API](https://developers.google.com/google-ads/api/docs/api-policy/access-levels) y [CLI de Codex](https://learn.chatgpt.com/docs/cli/reference).

## Otra cuenta de Ads bajo el mismo usuario

Si el usuario ya tiene acceso a esa cuenta, elegí su customer ID dentro de la consulta. No necesitás crear proyecto ni cliente OAuth nuevo solo por cambiar la cuenta consultada. Si el acceso es indirecto por MCC, indicá el login customer ID de la administradora. Pedí los permisos faltantes al responsable; el MCP no los crea.
