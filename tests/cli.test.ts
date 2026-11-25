import { describe, expect, it } from "vitest";
import { execute } from "../src/cli/program.ts";
import { serialize } from "../src/core/result.ts";

describe("cli", () => {
  it("prints a one-line catalog by default", async () => {
    const output = await execute([]);
    expect(output.exitCode).toBe(0);
    expect(output.result?.ok).toBe(true);
    if (!output.result?.ok) return;
    const line = serialize(output.result, false);
    expect(line).not.toContain("\n");
    expect(output.result.tool).toBe("catalog");
    expect(output.result.summary).toContain("meta-ads");
    expect(output.result.summary).toContain("Pendientes: google-ads, ga4");
  });

  it("routes a phrase", async () => {
    const output = await execute(["route", "performance de instagram ads"]);
    expect(output.exitCode).toBe(0);
    expect(output.result).toMatchObject({
      ok: true,
      tool: "route",
      data: { use: { id: "meta-ads" } },
    });
  });

  it("returns a usage error for an unknown command", async () => {
    const output = await execute(["no-existe"]);
    expect(output.exitCode).toBe(1);
    expect(output.result).toMatchObject({ ok: false, error: { code: "usage" } });
  });

  it("keeps help as text", async () => {
    const output = await execute(["--help"]);
    expect(output.exitCode).toBe(0);
    expect(output.raw).toContain("catalog");
    expect(output.result).toBeNull();
  });
});
