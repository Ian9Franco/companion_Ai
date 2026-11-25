---
name: companion-toolbox
description: Elige CLIs compactas o MCPs oficiales para tareas de marketing, desarrollo y gestión, y evita explorar el repo o conectar Google antes de tiempo. Usar cuando haya que reportar o gestionar Meta Ads, Google Ads o GA4, o decidir qué herramienta del contenedor companion corresponde.
---

# Companion toolbox

Antes de llamar plataformas o de leer el repositorio, corré:

```bash
npm run companion -- route "la tarea en una frase"
```

Sin una plataforma en la frase, `route` no adivina. Pedí Meta, Google Ads o GA4.

## Meta Ads

El MCP oficial `meta-ads` (`https://mcp.facebook.com/ads`) ya está conectado. Pedí período, cuenta y pocas métricas. No pidas el inventario completo. No cambies presupuesto, campañas ni anuncios si la persona no lo pidió en este turno.

## Google Ads y GA4

Siguen sin conectar. Si `route` los marca `planned`, decilo y parí. No configures esos MCP ni completes datos de memoria.

## Salida

Un comando devuelve un solo JSON: `ok`, `tool`, `summary`, `data`. El trabajo está en `summary` y en los campos pedidos. No reformatees una respuesta larga si el JSON ya alcanza.
