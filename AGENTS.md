# Companion

Este repo guarda CLIs cortas para agentes. stdout es un JSON. stderr es logs. No recorras el código para descubrir comandos.

Antes de proponer un conector o de leer archivos de proveedores, corré:

```bash
npm run companion -- route "la tarea en una frase"
```

Meta Ads ya está conectado por MCP oficial en `.cursor/mcp.json` (`https://mcp.facebook.com/ads`). No reimplementes la Marketing API. Google Ads y GA4 siguen planned: no los agregues a la config ni inventes sus métricas.

Al sumar una herramienta: registro en `src/registry/tools.ts`, implementación, test. Lectura primero. No commitees secretos ni los imprimas en logs.
