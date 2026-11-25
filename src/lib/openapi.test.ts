import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

interface OpenApiTestShape {
  openapi: string;
  jsonSchemaDialect: string;
  info: { title: string; version: string };
  servers: Array<{ url: string; description: string }>;
  paths: Record<
    string,
    {
      get: {
        operationId: string;
        description: string;
        parameters?: Array<Record<string, unknown>>;
        responses: Record<string, unknown>;
      };
    }
  >;
  components: {
    parameters: Record<string, unknown>;
    responses: {
      MarkdownNotFound: {
        content: Record<string, { schema: { $ref: string } }>;
      };
    };
    schemas: {
      ErrorResponse: { properties: { error: { $ref: string } } };
      ApiError: { required: string[] };
    };
  };
}

const specification = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../../public/openapi.json", import.meta.url)),
    "utf8",
  ),
) as OpenApiTestShape;

function resolveReference(reference: string): unknown {
  expect(reference.startsWith("#/")).toBe(true);
  return reference
    .slice(2)
    .split("/")
    .map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"))
    .reduce<unknown>(
      (value, part) => {
        expect(value).toBeTypeOf("object");
        return (value as Record<string, unknown>)[part];
      },
      specification as unknown as Record<string, unknown>,
    );
}

function collectReferences(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectReferences);
  if (!value || typeof value !== "object") return [];

  return Object.entries(value).flatMap(([key, child]) => {
    if (key === "$ref" && typeof child === "string") return [child];
    return collectReferences(child);
  });
}

describe("public OpenAPI specification", () => {
  it("uses OpenAPI 3.1 and identifies the production API", () => {
    expect(specification.openapi).toBe("3.1.0");
    expect(specification.jsonSchemaDialect).toBe(
      "https://json-schema.org/draft/2020-12/schema",
    );
    expect(specification.info).toMatchObject({
      title: "AVAIL Documentation API",
      version: "1.0.0",
    });
    expect(specification.servers).toContainEqual({
      url: "https://docs.availproject.org",
      description: "Production",
    });
  });

  it("documents every public documentation API endpoint", () => {
    expect(Object.keys(specification.paths)).toEqual([
      "/api/reference.json",
      "/api/search",
      "/api/markdown",
    ]);

    for (const path of Object.values(specification.paths)) {
      expect(path.get.responses["200"]).toBeDefined();
    }
  });

  it("uses query serialization for nested documentation slugs", () => {
    const parameters =
      specification.paths["/api/markdown"].get.parameters ?? [];
    const slugParameter = parameters.find((parameter) => {
      const resolved = (
        typeof parameter.$ref === "string"
          ? resolveReference(parameter.$ref)
          : parameter
      ) as Record<string, unknown>;
      return resolved.name === "slug";
    });
    expect(slugParameter).toBeDefined();

    const resolved = resolveReference(slugParameter?.$ref as string) as {
      in: string;
      example: string;
    };
    expect(resolved.in).toBe("query");
    expect(resolved.example).toBe("da/get-started");
  });

  it("provides unique function-calling metadata and typed schemas", () => {
    const operationIds = new Set<string>();

    for (const { get: operation } of Object.values(specification.paths)) {
      expect(operation.operationId).toMatch(/^[a-z][A-Za-z0-9]+$/);
      expect(operationIds.has(operation.operationId)).toBe(false);
      operationIds.add(operation.operationId);
      expect(operation.description.length).toBeGreaterThan(20);

      for (const parameter of operation.parameters ?? []) {
        const resolved = (
          typeof parameter.$ref === "string"
            ? resolveReference(parameter.$ref)
            : parameter
        ) as Record<string, unknown>;
        expect(resolved.name).toBeTypeOf("string");
        expect(resolved.in).toMatch(/^(path|query)$/);
        expect(resolved.schema).toBeTypeOf("object");
      }

      const success = operation.responses["200"] as Record<string, unknown>;
      const resolvedSuccess = (
        typeof success.$ref === "string"
          ? resolveReference(success.$ref)
          : success
      ) as Record<string, unknown>;
      expect(resolvedSuccess.content).toBeTypeOf("object");
      for (const media of Object.values(
        resolvedSuccess.content as Record<string, { schema?: unknown }>,
      )) {
        expect(media.schema).toBeTypeOf("object");
      }
    }
  });

  it("defines structured errors with codes, messages, and resolution hints", () => {
    const errorSchema =
      specification.components.schemas.ErrorResponse.properties.error;
    expect(errorSchema.$ref).toBe("#/components/schemas/ApiError");
    expect(specification.components.schemas.ApiError.required).toEqual([
      "code",
      "message",
      "resolution",
    ]);
    expect(
      specification.components.responses.MarkdownNotFound.content[
        "application/json"
      ].schema.$ref,
    ).toBe("#/components/schemas/ErrorResponse");
  });

  it("contains only resolvable internal references", () => {
    const references = collectReferences(specification);
    expect(references.length).toBeGreaterThan(0);
    for (const reference of references) {
      expect(resolveReference(reference)).toBeDefined();
    }
  });
});
