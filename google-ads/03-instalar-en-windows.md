# 03 — Instalar y conectar en Windows

Seguí esto en **cada PC**. Necesitás el proyecto preparado, un cliente OAuth de escritorio con su JSON y una cuenta Google autorizada en Ads. Los comandos van en PowerShell del usuario que usará Codex.

## 1. Instalá los programas

- [Python para Windows](https://www.python.org/downloads/windows/): versión 3.11 o superior para pipx. Durante la instalación, habilitá el acceso desde la línea de comandos.
- [pipx para Windows](https://pipx.pypa.io/stable/how-to/install-pipx.html): instala aplicaciones Python aisladas. Si ya tenés Python y pip, podés ejecutar estas dos líneas y luego abrir otra terminal:

        py -m pip install --user pipx
        py -m pipx ensurepath

- [Google Cloud CLI para Windows](https://docs.cloud.google.com/sdk/docs/install-sdk): ejecutá el instalador firmado por Google y abrí otra terminal.
- [Codex](https://learn.chatgpt.com/docs/extend/mcp): necesitás la app de escritorio o la CLI en la misma PC.

Verificá cada comando antes de seguir:

    py --version
    pipx --version
    gcloud --version
    codex --version

Si uno no se reconoce, resolvé su instalación o PATH con la guía oficial correspondiente.

## 2. Instalá el servidor de Google Ads

    pipx install google-ads-mcp

Si ya está instalado, no dupliques la instalación. Revisá la [versión vigente y la guía oficial de Google](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server) antes de actualizarlo.

## 3. Autorizá a la persona en esta PC

El JSON OAuth se queda en una carpeta privada local. Escribí su ruta **solo en PowerShell**, no en un chat:

    $oauthJson = (Read-Host 'Ruta completa del JSON OAuth').Trim('"')
    Test-Path -LiteralPath $oauthJson -PathType Leaf

La segunda línea debe devolver **True**. Después ejecutá:

    gcloud auth application-default login --scopes='https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform' --client-id-file="$oauthJson"

Terminá la selección de cuenta, passkey y consentimiento en el navegador. Dejá PowerShell abierto hasta que vuelva al prompt y diga **Credentials saved to file**. La URL temporal de autorización y el archivo ADC son sensibles: no los compartas. [Autenticación local indicada por Google](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server).

Si esta PC usa el ADC predeterminado para otro MCP de Google, coordina los alcances necesarios antes de volver a autorizar: una nueva autorización puede reemplazar los alcances disponibles para esas herramientas.

## 4. Registrá el MCP con lectura solamente

Abrí PowerShell **en la carpeta que contiene esta guía y tools_config.yaml**. Registrá el ID del proyecto en tu sesión y resolvé la ubicación del YAML:

    $projectId = Read-Host 'ID del proyecto de Google Cloud'
    $readOnlyConfig = (Resolve-Path -LiteralPath '.\tools_config.yaml').Path
    codex mcp add google_ads --env "GOOGLE_CLOUD_PROJECT=$projectId" --env "GOOGLE_ADS_MCP_TOOLS_CONFIG=$readOnlyConfig" -- google-ads-mcp

Si la cuenta usa una administradora MCC, podés indicar el ID en cada consulta. Solo si necesitás fijar una administradora para todo este MCP, agregá antes de los dos guiones de separación: --env "GOOGLE_ADS_LOGIN_CUSTOMER_ID=ID_DE_10_DIGITOS". No pongas IDs reales en archivos compartidos.

El servidor lee el ADC desde la ubicación predeterminada de gcloud, así que este comando **no necesita la ruta del JSON ni del ADC**. El YAML sí debe permanecer donde apunta la configuración; si movés esta carpeta, registrá su nueva ruta. [Google Ads MCP](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server) y [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp).

## 5. Reiniciá y comprobá

Ejecutá **codex mcp list** para ver que el servidor quedó registrado. Reiniciá la app de Codex; en el compositor, escribí **/mcp** y buscá **google_ads**. Verlo cargado comprueba la herramienta, no aún el acceso a una cuenta: seguí [04 Comprobación](04-comprobar-la-conexion.md).

En este servidor local STDIO, el inicio de sesión se hace con **gcloud auth application-default login**. **codex mcp login** corresponde a servidores MCP remotos HTTP con OAuth, no a este paso local. [Referencia de Codex CLI](https://learn.chatgpt.com/docs/cli/reference).
