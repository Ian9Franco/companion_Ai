import "dotenv/config";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createCompanionServer } from "./create-server.js";

serveStdio(() => createCompanionServer());
