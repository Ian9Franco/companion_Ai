# 06 — Si algo falla y cómo rotar credenciales

Diagnóstico mínimo: comprobar primero la herramienta, luego OAuth, proyecto, cuenta y operación. Revisá solo la categoría del error; no pegues JSON, tokens, URLs temporales de OAuth, rutas privadas ni respuestas completas en un chat.

## Si pasa esto…

| Síntoma | Comprobación y siguiente paso |
| --- | --- |
| PowerShell devuelve **False** al probar el JSON | El archivo está en otra carpeta o con otro nombre. Elegí su ruta real en tu propia terminal y activá la vista de extensiones de archivo. |
| gcloud dice que abrió el navegador, pero no muestra **Credentials saved to file** | La autorización aún está en curso. Terminá la selección de cuenta y el consentimiento; dejá PowerShell abierto hasta que vuelva al prompt. |
| MCP informa credenciales ADC ausentes | Repetí la autorización gcloud en el mismo usuario de Windows que ejecuta Codex. No presupongas que el inicio de sesión web creó ADC. |
| **google_ads** no aparece en /mcp | Comprobá **codex mcp list**, que **google-ads-mcp** se ejecuta desde PowerShell y que el YAML existe. Reiniciá Codex. |
| El servidor falla al arrancar por tools_config.yaml | La ruta guardada apunta a un archivo inexistente o el YAML no es válido. Conservá el contenido de [tools_config.yaml](tools_config.yaml). |
| **CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION** | El proyecto del cliente OAuth sigue en Prueba; solicitá Explorador o superior en la [página de acceso API](https://console.cloud.google.com/google/ads-apis/overview). |
| **NOT_ADS_USER** o cuenta no visible | Se autorizó una cuenta Google sin acceso a Ads. Verificá el usuario y sus permisos en [Google Ads](https://ads.google.com/). |
| **USER_PERMISSION_DENIED** | Falta acceso a la cuenta objetivo o el login customer ID de la MCC es incorrecto o está ausente. Usá diez dígitos sin guiones. |
| **ACCESS_TOKEN_SCOPE_INSUFFICIENT** | Volvé a autorizar ADC con el alcance **adwords**. |
| **invalid_grant** tras varios días | El token pudo vencer o revocarse. En Externo / Prueba, Google indica vencimiento a los 7 días; reautorizá y planificá publicación/verificación o un proyecto Personal si solo habrá una cuenta propia. |

[Errores comunes de Google Ads API](https://developers.google.com/google-ads/api/docs/get-started/common-errors) y [audiencia OAuth](https://support.google.com/cloud/answer/15549945).

## Si el JSON o el secreto se perdió

Google solo permite descargar el secreto completo al crearlo. Desde [Clientes OAuth](https://console.cloud.google.com/auth/clients), creá un cliente de escritorio nuevo o agregá un secreto nuevo al cliente si la política de tu organización lo permite. Guardá el JSON nuevo **antes de cerrar el diálogo**. No fabriques un JSON copiando valores por chat. [Gestión de secretos](https://support.google.com/cloud/answer/15549257).

## Rotación planificada

1. Identificá qué PCs y usuarios dependen del cliente actual; el responsable de accesos coordina el cambio.
2. Creá el reemplazo en el proyecto correcto y guardá su JSON de forma privada.
3. En cada PC, repetí **gcloud auth application-default login** con el nuevo JSON. Si esa PC comparte ADC con otros servicios Google, incluí también los alcances que necesitan.
4. Reiniciá Codex si cambiaste el registro MCP. Repetí las lecturas de [04](04-comprobar-la-conexion.md).
5. Solo después de verificar el reemplazo, deshabilitá y eliminá el secreto o cliente anterior desde Google Cloud. Quitar el servidor de Codex no revoca OAuth en Google.

Si el secreto anterior se expuso, coordiná su revocación con prioridad. Google permite tener temporalmente dos secretos para migrar sin corte, pero recomienda deshabilitar el viejo tras verificar el nuevo. [Rotación oficial](https://support.google.com/cloud/answer/15549257).

## Para una conexión estable

Una app **Externa / Prueba** emite autorizaciones que vencen a los 7 días, salvo los alcances básicos de perfil que no alcanzan para Ads. Para varias personas, prepará la publicación y verificación que Google requiera para el alcance adwords. Para una sola cuenta propia, el modo Personal evita ese vencimiento, pero requiere un proyecto configurado como Personal desde el inicio; no se puede convertir el existente. [Audiencia de Google Auth Platform](https://support.google.com/cloud/answer/15549945).
