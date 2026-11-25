import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { META_ADS_MCP_URL } from "../src/registry/tools.ts";
import { listCatalog, routeTask } from "../src/registry/route.ts";

describe("route", () => {
  it("sends a Meta task to the official MCP", () => {
    const routed = routeTask("reporte semanal de campañas en meta");
    expect(routed.data.matched).toBe(true);
    expect(routed.data.ambiguous).toBe(false);
    expect(routed.data.use?.id).toBe("meta-ads");
    expect(routed.data.use?.invoke).toBe(META_ADS_MCP_URL);
    expect(routed.data.use?.readOnly).toBe(true);
  });

  it("does not guess Meta from a generic report", () => {
    const routed = routeTask("reporte semanal de campañas");
    expect(routed.data.matched).toBe(false);
    expect(routed.summary).toContain("no inventes");
  });

  it("keeps Google Ads and GA4 unconnected", () => {
    expect(routeTask("gasto de google ads").data.use).toMatchObject({
      id: "google-ads",
      status: "planned",
      invoke: "no conectar en esta etapa",
    });
    expect(routeTask("sesiones de ga4").data.use?.status).toBe("planned");
    expect(routeTask("sesiones de ga4").summary).toContain("no está conectado");
  });

  it("keeps two platforms apart", () => {
    const routed = routeTask("comparar meta y google ads");
    expect(routed.data.ambiguous).toBe(true);
    expect(routed.data.use?.id).toBe("google-ads");
    expect(routed.data.also.map((tool) => tool.id)).toEqual(["meta-ads"]);
    expect(routed.summary).toContain("por separado");
  });

  it("offers the catalog when the question is about tools", () => {
    const routed = routeTask("que herramientas hay");
    expect(routed.data.use?.id).toBe("catalog");
  });

  it("prefers Meta over the catalog when both are named", () => {
    const routed = routeTask("que herramientas hay para meta");
    expect(routed.data.use?.id).toBe("meta-ads");
  });
});

describe("catalog", () => {
  it("lists ready and planned tools without keywords", () => {
    const items = listCatalog();
    expect(items.map((tool) => tool.id)).toEqual([
      "catalog",
      "route",
      "meta-ads",
      "google-ads",
      "ga4",
    ]);
    expect(JSON.stringify(items)).not.toContain("keywords");
    expect(items.find((tool) => tool.id === "meta-ads")?.invoke).toBe(META_ADS_MCP_URL);
  });

  it("points Cursor at the same Meta MCP url", () => {
    const config = JSON.parse(readFileSync(new URL("../.cursor/mcp.json", import.meta.url), "utf8")) as {
      mcpServers: { "meta-ads": { url: string } };
    };
    expect(config.mcpServers["meta-ads"].url).toBe(META_ADS_MCP_URL);
  });
});
