import { AMAZON_BASE } from "@/config";
import { HTTPException } from "hono/http-exception";

export interface AmazonApiProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: any;
  headers?: Record<string, string>;
  query?: Record<string, string>;
}

export const amazonApi = async <T>(props: AmazonApiProps) => {
  const { method, path, body, headers = {}, query } = props;

  const url = new URL(path, AMAZON_BASE);

  if (query) {
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const { status, ok } = response;
  const result = tryParseJson(await response.text());

  if (!ok) {
    throw new HTTPException(500, {
      message: `Api Error Occured with status code ${status}`,
    });
  }

  return result as T;
};

const tryParseJson = (text: string) => {
  try {
    return JSON.parse(text) as any;
  } catch {
    try {
      const splitted = text.split("\n&&&\n");

      return splitted
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null;
          }
        })
        .filter((s) => s) as any[];
    } catch {
      return text as string;
    }
  }
};
