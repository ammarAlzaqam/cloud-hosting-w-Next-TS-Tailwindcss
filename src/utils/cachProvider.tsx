"use client";
import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({ key: "mui" });

export default function CacheProviderEmotion({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </div>
  );
}