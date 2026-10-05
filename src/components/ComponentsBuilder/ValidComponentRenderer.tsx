import type { ConfigSchema } from "./types.ts";
import ComponentSchemaValidation from "./ComponentSchemaValidation.tsx";
import { ComponentRenderer } from "./ComponentRenderer.tsx";

export default function ValidComponentRenderer({ config }: { config: ConfigSchema }) {
  return (
    <ComponentSchemaValidation config={config} childComponent={ComponentRenderer} />
  );
}
