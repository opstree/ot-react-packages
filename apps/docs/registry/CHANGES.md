# Registry System Update

## Summary of Changes

We encountered a TypeScript error in `apps/docs/scripts/build-registry.ts` where the property `registryDependencies` was not recognized on component objects. This happened because the `components` array was inferring its type from the object literals, and since none of the existing components had `registryDependencies` defined, TypeScript assumed the property did not exist on the type at all.

To fix this and improve the robustness of our registry system, we made the following changes:

### 1. Defined `ComponentDef` Interface

In `apps/docs/registry/components.ts`, we introduced a strictly typed interface `ComponentDef` to define the shape of a registry component.

```typescript
export type ComponentDef = {
  id: string
  name: string
  category: string
  framework: string
  version: string
  status: string
  tags: string[]
  source: {
    type: "local"
    path: string
  }
  dependencies: string[]
  metadata?: {
    props?: string[]
    variants?: string[]
    previewUrl?: string
    registryDependencies?: string[] // Explicitly defined as optional
  }
  docs: {
    slug: string
    title: string
    description: string
  }
}
```

This ensures that all properties, including optional ones like `registryDependencies`, are known to TypeScript even if they aren't present in every object.

### 2. Typed the `components` Array

We applied this interface to the `components` export:

```typescript
export const components: ComponentDef[] = [ ... ]
```

This enforces the structure on all current and future components.

### 3. Updated Build Script

In `apps/docs/scripts/build-registry.ts`, we updated the code to safely access the property:

```typescript
// OLD (caused error)
// registryDependencies: component.metadata?.registryDependencies as string[] || [],

// NEW (type-safe)
registryDependencies: component.metadata?.registryDependencies || [],
```

With the proper interface in place, we no longer need risky type assertions, and the code is cleaner and safer.
