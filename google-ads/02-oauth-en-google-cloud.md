# 02 — OAuth en Google Cloud

Hacé estos pasos dentro del proyecto elegido en [01](01-proyecto-y-acceso.md). OAuth identifica a la aplicación; el usuario que consiente aporta sus permisos de Google Ads. Ninguna de las dos cosas reemplaza a la otra.

## 1. Elegí la audiencia antes de crearla

| Uso previsto | Camino |
| --- | --- |
| Solo la cuenta de Google que crea la app | Evaluá el [modo Personal de Google](https://support.google.com/cloud/answer/15544987). No tiene vencimiento de autorización de 7 días por modo de prueba, pero solo esa cuenta puede autorizar; requiere un proyecto configurado así desde el inicio. |
| Varias personas | Configurá **Usuarios externos** en [Google Auth Platform](https://console.cloud.google.com/auth/overview). En estado **Prueba**, agregá cada usuario autorizado a **Público → Usuarios de prueba**. Sus autorizaciones vencen a los 7 días; para uso estable se necesita preparar la publicación y verificación aplicable. |

Un proyecto Externo no puede convertirse en Personal, ni al revés. [Ayuda oficial sobre audiencia](https://support.google.com/cloud/answer/15549945).

## 2. Configurá Google Auth Platform

1. Abrí [Google Auth Platform](https://console.cloud.google.com/auth/overview) y verificá el proyecto del encabezado.
2. Si muestra **Comenzar**, indicá nombre de la app, correo de asistencia, audiencia y correo de contacto. Revisá la política de datos de Google antes de aceptarla.
3. En [Acceso a los datos](https://console.cloud.google.com/auth/scopes), pulsá **Agregar o quitar permisos** y agregá el alcance completo: https://www.googleapis.com/auth/adwords. Si no aparece en la tabla, usá **Agregar permisos manualmente**. Guardá y comprobá que figure.
4. Si elegiste Externo en Prueba, abrí [Público](https://console.cloud.google.com/auth/audience), agregá como **Usuario de prueba** a cada cuenta Google que autorizará el MCP y verificá que aparezca en la lista.

El alcance **adwords** puede autorizar lectura y cambios. Para este recorrido, el servidor MCP se restringe a lectura mediante [tools_config.yaml](tools_config.yaml); el rol del usuario en Ads también importa. [Modelo de acceso](https://developers.google.com/google-ads/api/docs/oauth/access-model).

## 3. Creá un cliente OAuth de escritorio

1. Abrí [Clientes](https://console.cloud.google.com/auth/clients) → **Crear cliente**.
2. Elegí **App de escritorio** y poné un nombre que identifique su uso o equipo. Para un cliente dedicado a MCP, marcá **Usar este cliente para un agente potenciado por IA**. Esa etiqueta no suma permisos.
3. Pulsá **Crear**. En el diálogo de creación, **descargá el JSON antes de cerrarlo**. Google muestra el secreto completo solo en ese momento.
4. Guardá el JSON en una carpeta privada del usuario local, fuera de repositorios, chats y carpetas compartidas. No pegues su contenido ni una captura del secreto en tickets o conversaciones.

Si cerraste el diálogo sin descargar el JSON, no podrás recuperar ese secreto. Creá otro cliente o rotá el secreto desde el detalle, descargá el nuevo material en el momento y retirá el anterior cuando compruebes el reemplazo. [Gestión de clientes OAuth](https://support.google.com/cloud/answer/15549257).

## 4. Continuá

En la PC donde vas a usar Codex, seguí [03 Instalación y conexión](03-instalar-en-windows.md). Cada persona debe autorizar su propia cuenta en su propia sesión; una prueba ajena no demuestra acceso propio.
