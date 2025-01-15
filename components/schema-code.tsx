'use client';

export function SchemaCode({ schema }: { schema: Record<string, unknown> }) {
  return (
    <div className="border rounded-sm p-4 overflow-x-auto">
      <pre className="text-xs">
        <code>{JSON.stringify(schema, null, 2)}</code>
      </pre>
    </div>
  );
}
