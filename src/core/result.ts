export type ToolSuccess<T> = {
  ok: true;
  tool: string;
  summary: string;
  data: T;
};

export type ToolFailure = {
  ok: false;
  tool: string;
  summary: string;
  error: {
    code: string;
    message: string;
  };
};

export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

export function ok<T>(tool: string, summary: string, data: T): ToolSuccess<T> {
  return { ok: true, tool, summary, data };
}

export function fail(tool: string, code: string, message: string): ToolFailure {
  return {
    ok: false,
    tool,
    summary: message,
    error: { code, message },
  };
}

export function serialize(result: ToolResult<unknown>, pretty: boolean): string {
  return JSON.stringify(result, null, pretty ? 2 : undefined);
}
