export const META_ADS_MCP_URL = "https://mcp.facebook.com/ads";

export type Surface = "cli" | "official-mcp";
export type ToolStatus = "ready" | "planned";

export type ToolDefinition = {
  id: string;
  surface: Surface;
  status: ToolStatus;
  readOnly: boolean;
  summary: string;
  when: string;
  avoid: string;
  invoke: string;
  /** Shown when this tool is the chosen route. */
  note: string;
  /** Distinctive terms. Generic words like "campaña" are omitted on purpose. */
  keywords: readonly string[];
};

export const tools = [
  {
    id: "catalog",
    surface: "cli",
    status: "ready",
    readOnly: true,
    summary: "Lista las herramientas y cuándo usar cada una.",
    when: "No sabés qué comando o MCP corresponde, y la tarea no nombra una plataforma.",
    avoid: "No la uses si route ya eligió una herramienta.",
    invoke: "npm run companion -- catalog",
    note: "No recorras el repositorio para descubrir comandos.",
    keywords: ["catalogo", "catalog", "que herramientas", "listar herramientas"],
  },
  {
    id: "route",
    surface: "cli",
    status: "ready",
    readOnly: true,
    summary: "Elige CLI local u MCP oficial para una tarea, en una respuesta corta.",
    when: "Hay una tarea concreta y hay que decidir el camino antes de llamar APIs.",
    avoid: "No reemplaza al MCP de Meta ni trae métricas.",
    invoke: "npm run companion -- route \"reporte semanal de meta\"",
    note: "Llamala antes de explorar el repo o de conectar un servidor nuevo.",
    keywords: [],
  },
  {
    id: "meta-ads",
    surface: "official-mcp",
    status: "ready",
    readOnly: true,
    summary: "MCP oficial de Meta Ads. Reportes, campañas, catálogos, señales y actividad.",
    when: "La tarea toca Meta, Facebook o Instagram Ads.",
    avoid: "No pidas el inventario completo. No cambies presupuesto, campañas ni anuncios si no te lo pidieron. No reimplementes la Marketing API.",
    invoke: META_ADS_MCP_URL,
    note: "Pedí período, cuenta y pocas métricas. Solo lectura salvo pedido explícito de cambio.",
    keywords: [
      "meta",
      "facebook",
      "instagram",
      "meta ads",
      "facebook ads",
      "instagram ads",
    ],
  },
  {
    id: "google-ads",
    surface: "official-mcp",
    status: "planned",
    readOnly: true,
    summary: "MCP oficial de Google Ads. Todavía no está conectado.",
    when: "La tarea es de Google Ads y esta etapa ya se habilitó.",
    avoid: "No lo conectes ni inventes métricas mientras siga planned.",
    invoke: "no conectar en esta etapa",
    note: "No conectar ni inventar datos.",
    keywords: ["google ads", "adwords"],
  },
  {
    id: "ga4",
    surface: "official-mcp",
    status: "planned",
    readOnly: true,
    summary: "MCP oficial de Google Analytics 4. Todavía no está conectado.",
    when: "La tarea es de GA4 o Google Analytics y esta etapa ya se habilitó.",
    avoid: "No lo conectes ni mezcles sus métricas con las de Ads mientras siga planned.",
    invoke: "no conectar en esta etapa",
    note: "No conectar ni inventar datos.",
    keywords: ["ga4", "google analytics"],
  },
] as const satisfies readonly ToolDefinition[];

export type ToolId = (typeof tools)[number]["id"];
