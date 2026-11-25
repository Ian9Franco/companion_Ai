import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { describe, expect, it } from "vitest";

function startServer(): ChildProcessWithoutNullStreams {
  return spawn(process.execPath, ["--import", "tsx", "src/mcp/server.ts"], {
    cwd: process.cwd(),
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  });
}

async function readLines(child: ChildProcessWithoutNullStreams): Promise<{
  lines: unknown[];
  stderr: string;
  waitFor: (predicate: () => boolean) => Promise<void>;
}> {
  const lines: unknown[] = [];
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    stdout += chunk;
    let index = stdout.indexOf("\n");
    while (index >= 0) {
      const line = stdout.slice(0, index).trim();
      stdout = stdout.slice(index + 1);
      if (line) lines.push(JSON.parse(line));
      index = stdout.indexOf("\n");
    }
  });
  child.stderr.on("data", (chunk: string) => {
    stderr += chunk;
  });

  return {
    lines,
    get stderr() {
      return stderr;
    },
    waitFor(predicate: () => boolean) {
      const started = Date.now();
      return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
          if (predicate()) {
            clearInterval(timer);
            resolve();
            return;
          }
          if (Date.now() - started > 8000) {
            clearInterval(timer);
            reject(new Error(`timeout\nstderr: ${stderr}\nlines: ${JSON.stringify(lines)}`));
          }
        }, 30);
      });
    },
  };
}

describe("mcp", () => {
  it("lists companion_route and answers a Meta task", async () => {
    const child = startServer();
    const reader = await readLines(child);
    const send = (message: unknown) => {
      child.stdin.write(`${JSON.stringify(message)}\n`);
    };

    try {
      send({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-11-25",
          capabilities: {},
          clientInfo: { name: "companion-test", version: "0.0.0" },
        },
      });
      await reader.waitFor(() => reader.lines.some((line) => isResponse(line, 1)));
      send({ jsonrpc: "2.0", method: "notifications/initialized" });
      send({ jsonrpc: "2.0", id: 2, method: "tools/list" });
      await reader.waitFor(() => reader.lines.some((line) => isResponse(line, 2)));

      const listed = reader.lines.find((line) => isResponse(line, 2));
      expect(JSON.stringify(listed)).toContain("companion_route");

      send({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "companion_route", arguments: { task: "reporte de meta ads" } },
      });
      await reader.waitFor(() => reader.lines.some((line) => isResponse(line, 3)));
      const called = reader.lines.find((line) => isResponse(line, 3));
      const body = JSON.stringify(called);
      expect(body).toContain("meta-ads");
      expect(body).toContain("https://mcp.facebook.com/ads");
    } finally {
      child.kill();
    }
  });
});

function isResponse(line: unknown, id: number): boolean {
  return typeof line === "object" && line !== null && "id" in line && line.id === id;
}
