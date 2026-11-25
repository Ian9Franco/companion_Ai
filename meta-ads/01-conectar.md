# 01 — Conectar Meta Ads

## Requisitos

- Un usuario de Facebook con acceso autorizado a la cuenta publicitaria.
- Una aplicación que acepte MCP remoto por Streamable HTTP y OAuth.
- Permiso para agregar servidores MCP en esa aplicación.

## Codex de escritorio

1. Abrí **Configuración → Servidores MCP → Agregar servidor**.
2. Usá un nombre reconocible como `meta_ads`, transporte **Streamable HTTP** y URL `https://mcp.facebook.com/ads`.
3. Guardá y reiniciá Codex.
4. Seleccioná **Autenticar** y completá OAuth en Facebook con el usuario correcto.
5. Abrí un chat nuevo y escribí `/mcp` para ver si el servidor cargó.

Alternativa en PowerShell:

```powershell
codex mcp add meta_ads --url https://mcp.facebook.com/ads
codex mcp login meta_ads
codex mcp list
```

Codex de escritorio y su CLI comparten la configuración. [Documentación de Codex](https://learn.chatgpt.com/docs/extend/mcp).

## Otro agente o modelo

En la configuración MCP del cliente elegido, registrá la misma URL como servidor remoto HTTP, iniciá OAuth desde ese cliente y comprobá sus herramientas. La cuenta de Facebook debe autorizar **esa instalación**. Los nombres de botones y la compatibilidad con OAuth varían por aplicación; seguí su documentación. No conviertas esta URL en un servidor STDIO ni agregues tokens manuales salvo que la documentación oficial de esa aplicación lo exija.

[Meta for Business](https://es-la.facebook.com/business/tools/ads-mcp-server).
