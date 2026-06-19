# OPS-UI Workflow — Registry & CLI

---

## Part 1 — How the Docs Registry Works

The docs site (`apps/www`) is both a **documentation website** and the **build machine** for the component registry.

```
 DEVELOPER
    │
    │  1. Create a .tsx component file
    │     apps/www/src/components/docs/ts/Button.tsx
    │
    ▼
┌─────────────────────────────────────────────────────┐
│              npm run registry:sync                  │
│                                                     │
│  Scans  ──►  apps/www/src/components/docs/ts/*.tsx     │
│  Reads  ──►  JSDoc tags (@name, @description, ...)  │
│  Writes ──►  apps/www/src/registry/components.ts    │
└─────────────────────────────────────────────────────┘
    │
    │  2. components.ts now knows about Button
    │
    ▼
┌─────────────────────────────────────────────────────┐
│              npm run registry:build                 │
│                                                     │
│  Reads   ──►  src/registry/components.ts            │
│  Reads   ──►  actual source code from docs/*.tsx    │
│  Fixes   ──►  imports (../../lib → @/lib/utils)     │
│  Embeds  ──►  raw source code inside JSON           │
│  Writes  ──►  public/registry/components/           │
│                 ├── button.json    (with source)    │
│                 ├── sidebar.json   (with source)    │
│                 └── ...                             │
│  Writes  ──►  public/registry/registry.json         │
│  Writes  ──►  public/registry/index.json            │
└─────────────────────────────────────────────────────┘
    │
    │  3. JSON files are now hosted on GitHub Raw / CDN
    │
    ▼
 REGISTRY IS LIVE
```

### What a JSON manifest looks like

```json
// public/registry/components/button.json
{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "A Button component.",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [
    {
      "path": "Button.tsx",
      "content": "import React from 'react'...",   // ← full source code embedded here
      "type": "registry:ui"
    }
  ]
}
```

---

## Part 2 — How the CLI Extracts Components

When a user runs `opscli add button` in their own project, here is exactly what happens:

```
 USER PROJECT
    │
    │  opscli add button
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Step 1 — Check Initialization                      │
│                                                     │
│  Does components.json exist in the project?         │
│  YES ──► continue                                   │
│  NO  ──► throw error: "Run opscli init first"       │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Step 2 — Fetch Manifest from Registry              │
│                                                     │
│  GET https://raw.githubusercontent.com/.../         │
│          registry/components/button.json            │
│                                                     │
│  Receives ──► JSON with embedded source code        │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Step 3 — Resolve Dependencies                      │
│                                                     │
│  a. registryDependencies (other OPS-UI components)  │
│     ──► fetch & install those components first      │
│                                                     │
│  b. dependencies (npm packages)                     │
│     ──► run: npm install clsx tailwind-merge ...    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Step 4 — Write Source Code to User's Project       │
│                                                     │
│  Reads   ──►  components.json → aliases.ui path     │
│  Creates ──►  components/ui/  (if missing)          │
│  Writes  ──►  components/ui/Button.tsx              │
│               (extracted from the JSON manifest)    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
 ✔ Component added successfully!

 You can now import it:
 import { Button } from "@/components/ui/Button"
```

---

## Full End-to-End Picture

```
 [Developer writes Button.tsx]
          │
          │ registry:sync
          ▼
 [src/registry/components.ts updated]
          │
          │ registry:build
          ▼
 [public/registry/components/button.json]  ← source code embedded inside
          │
          │ pushed to GitHub / deployed
          ▼
 [GitHub Raw URL / CDN serves the JSON]
          │
          │ user runs: opscli add button
          ▼
 [CLI fetches button.json from the URL]
          │
          │ extracts content field
          ▼
 [writes Button.tsx into user's components/ui/]
          │
          ▼
 [user imports and uses the component] ✅
```

---

## Quick Reference — Commands

| What you want to do | Command | Where to run |
|---|---|---|
| Add a new `.tsx` component to registry | `npm run registry:sync` | `apps/www/` |
| Build the JSON manifest files | `npm run registry:build` | `apps/www/` |
| Initialize a user project | `opscli init` | User's project root |
| Add a component to a user project | `opscli add button` | User's project root |
| List all available components | `opscli list` | Anywhere |
| Remove a component | `opscli remove button` | User's project root |
