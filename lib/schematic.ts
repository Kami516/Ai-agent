import { SchematicClient } from "@schematichq/schematic-typescript-node";

if(!process.env.SCHEMATIC_API_KEY) {
  throw new Error("Missing SCHEMATIC_API_KEY environment variable");
}

export const client = new SchematicClient({
  apiKey: process.env.SCHEMATIC_API_KEY,
  cacheProviders: {
    flagChecks: [],
  },
});