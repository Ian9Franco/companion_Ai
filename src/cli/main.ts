#!/usr/bin/env node
import "dotenv/config";
import { serialize } from "../core/result.js";
import { execute } from "./program.js";

const output = await execute(process.argv.slice(2));
if (output.raw) {
  process.stdout.write(output.raw);
} else if (output.result) {
  process.stdout.write(`${serialize(output.result, output.pretty)}\n`);
}
process.exit(output.exitCode);
