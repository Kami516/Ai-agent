"use client"

import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapper";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schematicPubKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if(!schematicPubKey) {
    throw new Error("Schematic Publishable Key is not provided");
  }

  return (
    <ClerkProvider>
      <SchematicProvider publishableKey={schematicPubKey}>
        <SchematicWrapped>
          {children}
        </SchematicWrapped>
      </SchematicProvider>
    </ClerkProvider>
  );
}
