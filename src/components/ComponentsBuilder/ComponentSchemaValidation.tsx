import ErrorComponent from "../../components/ErrorComponent.tsx";
import { z } from "zod";
import { ComponentType } from "preact";
import { useState } from "preact/hooks";
import type { ConfigSchema } from "./types.ts";

const configSchema = z.object({
  cmpId: z.string(),
  type: z.string(),
  props: z.object({
    label: z.string().optional(),
    date: z.object().optional(),
    value: z.object().optional(),
  }),
});

type Props = {
  config: ConfigSchema;
  childComponent: ComponentType<{ config: ConfigSchema }>;
};

export default function ComponentSchemaValidation({
  config,
  childComponent: Child,
}: Props) {
  const [error, setError] = useState<Error | null>(null);
  if (!configSchema.safeParse(config).success || !Child) {
    setError(new Error("Invalid config"));
    return <ErrorComponent error={error} resetError={() => setError(null)} />;
  }
  return <Child config={config} />;
}
