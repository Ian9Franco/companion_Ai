import { ok, type ToolSuccess } from "../core/result.js";
import { tools, type ToolDefinition } from "./tools.js";

export type CatalogItem = {
  id: string;
  surface: ToolDefinition["surface"];
  status: ToolDefinition["status"];
  readOnly: boolean;
  summary: string;
  when: string;
  avoid: string;
  invoke: string;
};

export type RouteChoice = {
  id: string;
  surface: ToolDefinition["surface"];
  status: ToolDefinition["status"];
  readOnly: boolean;
  invoke: string;
  note: string;
};

export type RouteData = {
  matched: boolean;
  ambiguous: boolean;
  use: RouteChoice | null;
  also: RouteChoice[];
};

const domainTools = tools.filter((tool) => tool.id !== "catalog" && tool.id !== "route");

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesKeyword(text: string, keyword: string): boolean {
  const needle = normalize(keyword);
  if (!needle) return false;
  if (needle.includes(" ")) return text.includes(needle);
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "u").test(text);
}

export function keywordScore(text: string, keywords: readonly string[]): number {
  let score = 0;
  for (const keyword of keywords) {
    if (!matchesKeyword(text, keyword)) continue;
    const needle = normalize(keyword);
    score += needle.length + (needle.includes(" ") ? 8 : 0);
  }
  return score;
}

export function listCatalog(): CatalogItem[] {
  return tools.map((tool) => ({
    id: tool.id,
    surface: tool.surface,
    status: tool.status,
    readOnly: tool.readOnly,
    summary: tool.summary,
    when: tool.when,
    avoid: tool.avoid,
    invoke: tool.invoke,
  }));
}

function toChoice(tool: ToolDefinition): RouteChoice {
  return {
    id: tool.id,
    surface: tool.surface,
    status: tool.status,
    readOnly: tool.readOnly,
    invoke: tool.invoke,
    note: tool.status === "planned" ? "No conectar ni inventar datos." : tool.note,
  };
}

export function routeTask(task: string): { summary: string; data: RouteData } {
  const text = normalize(task);
  const none: RouteData = { matched: false, ambiguous: false, use: null, also: [] };
  if (!text) {
    return {
      summary: "Falta la tarea. Nombrá la plataforma o corré catalog.",
      data: none,
    };
  }

  const ranked = domainTools
    .map((tool) => ({ tool, score: keywordScore(text, tool.keywords) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.id.localeCompare(b.tool.id));

  if (ranked.length === 0) {
    const catalog = tools.find((tool) => tool.id === "catalog");
    if (catalog && keywordScore(text, catalog.keywords) > 0) {
      return {
        summary: "Usá catalog. No recorras el repositorio.",
        data: { matched: true, ambiguous: false, use: toChoice(catalog), also: [] },
      };
    }
    return {
      summary:
        "Ninguna herramienta coincide. Si es Meta, Google Ads o GA4, nombrala. Si no, no inventes un conector.",
      data: none,
    };
  }

  const [best, ...rest] = ranked;
  if (!best) {
    return { summary: "Ninguna herramienta coincide.", data: none };
  }

  const chosen = best.tool;
  const also = rest.map((entry) => toChoice(entry.tool));
  const ambiguous = also.length > 0;
  const data: RouteData = {
    matched: true,
    ambiguous,
    use: toChoice(chosen),
    also,
  };

  if (ambiguous) {
    const ids = [chosen, ...rest.map((entry) => entry.tool)].map((tool) => tool.id).join(" y ");
    return {
      summary: `Coinciden ${ids}. Usalas por separado y no mezcles métricas.`,
      data,
    };
  }

  if (chosen.status === "planned") {
    return {
      summary: `${chosen.id} todavía no está conectado. No lo configures ni inventes datos.`,
      data,
    };
  }

  if (chosen.surface === "official-mcp") {
    return {
      summary: `Usa ${chosen.id}, MCP oficial, solo lectura salvo pedido explícito.`,
      data,
    };
  }

  return { summary: `Usa ${chosen.id}. ${chosen.note}`, data };
}

export function catalogResult(): ToolSuccess<{ tools: CatalogItem[] }> {
  const items = listCatalog();
  const ready = items.filter((tool) => tool.status === "ready").map((tool) => tool.id);
  const planned = items.filter((tool) => tool.status === "planned").map((tool) => tool.id);
  const summary = `Listas: ${ready.join(", ")}. Pendientes: ${planned.join(", ")}.`;
  return ok("catalog", summary, { tools: items });
}

export function routeResult(task: string): ToolSuccess<RouteData> {
  const routed = routeTask(task);
  return ok("route", routed.summary, routed.data);
}
