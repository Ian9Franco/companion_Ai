import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { logger } from "../core/logger.js";
import { serialize } from "../core/result.js";
import { catalogResult, routeResult } from "../registry/route.js";
import { VERSION } from "../core/version.js";

const inputSchema = z.object({
  task: z
    .string()
    .min(1)
    .max(400)
    .optional()
    .describe("Tarea en una frase. Omitila para recibir el catálogo."),
});

export function createCompanionServer(): McpServer {
  const server = new McpServer({ name: "companion", version: VERSION });

  server.registerTool(
    "companion_route",
    {
      title: "Elegir herramienta",
      description:
        "Elige una CLI de este repo o un MCP oficial (Meta Ads ya conectado; Google Ads y GA4 todavía no) para una tarea de marketing, desarrollo o gestión. Llamala antes de explorar el código o de conectar servidores nuevos. Sin task, devuelve el catálogo corto.",
      inputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ task }) => {
      const trimmed = task?.trim();
      const result = trimmed ? routeResult(trimmed) : catalogResult();
      logger.debug({ tool: result.tool }, "companion mcp");
      return {
        content: [{ type: "text", text: serialize(result, false) }],
      };
    },
  );

  return server;
}
