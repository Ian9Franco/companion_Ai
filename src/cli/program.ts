import { Command, CommanderError } from "commander";
import { fail, type ToolResult } from "../core/result.js";
import { VERSION } from "../core/version.js";
import { catalogResult, routeResult } from "../registry/route.js";

export type CliOutput = {
  exitCode: number;
  pretty: boolean;
  /** Set for --help and --version, which stay human-readable. */
  raw?: string;
  result: ToolResult<unknown> | null;
};

export async function execute(argv: string[]): Promise<CliOutput> {
  const pretty = argv.includes("--pretty");
  const args = argv.filter((arg) => arg !== "--pretty");
  let captured = "";
  let result: ToolResult<unknown> | undefined;

  const program = new Command();
  program
    .name("companion")
    .description("CLIs compactas para agentes. stdout es JSON. stderr es logs.")
    .version(VERSION)
    .exitOverride()
    .configureOutput({
      writeOut(text) {
        captured += text;
      },
      writeErr(text) {
        captured += text;
      },
    });

  program.action(() => {
    result = catalogResult();
  });

  program
    .command("catalog")
    .description("Lista herramientas y cuándo usar cada una.")
    .action(() => {
      result = catalogResult();
    });

  program
    .command("route")
    .argument("<task>", "Tarea en una frase")
    .description("Elige la CLI o el MCP oficial para una tarea.")
    .action((task: string) => {
      result = routeResult(task);
    });

  try {
    await program.parseAsync(args, { from: "user" });
  } catch (error) {
    if (error instanceof CommanderError) {
      if (error.exitCode === 0) {
        return { exitCode: 0, pretty, raw: captured, result: null };
      }
      const message = (captured || error.message).trim();
      return {
        exitCode: 1,
        pretty,
        result: fail("companion", "usage", message),
      };
    }
    throw error;
  }

  if (!result) {
    return {
      exitCode: 1,
      pretty,
      result: fail("companion", "internal", "El comando no produjo resultado."),
    };
  }

  return { exitCode: result.ok ? 0 : 1, pretty, result };
}
