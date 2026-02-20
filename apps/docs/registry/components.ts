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
    registryDependencies?: string[]
  }
  docs: {
    slug: string
    title: string
    description: string
  }
}

export const components: ComponentDef[] = [
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    framework: "react",
    version: "1.0.0",
    status: "stable",
    tags: ["loading", "placeholder"],
    source: {
      type: "local",
      path: "components/docs/Skeleton.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/skeleton"
    },
    docs: {
      slug: "/components/skeleton",
      title: "Skeleton",
      description: "Used for loading states"
    }
  },
  {
    id: "table",
    name: "Table",
    category: "Data Display",
    framework: "react",
    version: "1.0.0",
    status: "stable",
    tags: ["data", "display"],
    source: {
      type: "local",
      path: "components/docs/Table.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["data", "columns", "className"],
      variants: ["striped", "bordered"],
      previewUrl: "/docs/components/table"
    },
    docs: {
      slug: "/components/table",
      title: "Table",
      description: "Used for displaying data in tabular format"
    }
  },

  {
    id: "badge",
    name: "Badge",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["badge"],
    source: {
      type: "local",
      path: "components/docs/Badge.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/badge"
    },
    docs: {
      slug: "/components/badge",
      title: "Badge",
      description: "Description for Badge"
    }
  },
  {
    id: "cards",
    name: "Cards",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["cards"],
    source: {
      type: "local",
      path: "components/docs/Cards.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/cards"
    },
    docs: {
      slug: "/components/cards",
      title: "Cards",
      description: "Description for Cards"
    }
  },
  {
    id: "chatbot",
    name: "Chatbot",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["chatbot"],
    source: {
      type: "local",
      path: "components/docs/Chatbot.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/chatbot"
    },
    docs: {
      slug: "/components/chatbot",
      title: "Chatbot",
      description: "Description for Chatbot"
    }
  },
  {
    id: "filterchip",
    name: "Filterchip",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["filterchip"],
    source: {
      type: "local",
      path: "components/docs/Filterchip.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/filterchip"
    },
    docs: {
      slug: "/components/filterchip",
      title: "Filterchip",
      description: "Description for Filterchip"
    }
  },
  {
    id: "filters",
    name: "Filters",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["filters"],
    source: {
      type: "local",
      path: "components/docs/Filters.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/filters"
    },
    docs: {
      slug: "/components/filters",
      title: "Filters",
      description: "Description for Filters"
    }
  },
  {
    id: "header",
    name: "Header",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["header"],
    source: {
      type: "local",
      path: "components/docs/Header.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/header"
    },
    docs: {
      slug: "/components/header",
      title: "Header",
      description: "Description for Header"
    }
  },
  {
    id: "multiplefilter",
    name: "MultipleFilter",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["multiplefilter"],
    source: {
      type: "local",
      path: "components/docs/MultipleFilter.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/multiplefilter"
    },
    docs: {
      slug: "/components/multiplefilter",
      title: "MultipleFilter",
      description: "Description for MultipleFilter"
    }
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["pagination"],
    source: {
      type: "local",
      path: "components/docs/Pagination.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/pagination"
    },
    docs: {
      slug: "/components/pagination",
      title: "Pagination",
      description: "Description for Pagination"
    }
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["sidebar"],
    source: {
      type: "local",
      path: "components/docs/Sidebar.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/sidebar"
    },
    docs: {
      slug: "/components/sidebar",
      title: "Sidebar",
      description: "Description for Sidebar"
    }
  },
  {
    id: "spiderview",
    name: "SpiderView",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["spiderview"],
    source: {
      type: "local",
      path: "components/docs/SpiderView.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/spiderview"
    },
    docs: {
      slug: "/components/spiderview",
      title: "SpiderView",
      description: "Description for SpiderView"
    }
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["timeline"],
    source: {
      type: "local",
      path: "components/docs/Timeline.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/timeline"
    },
    docs: {
      slug: "/components/timeline",
      title: "Timeline",
      description: "Description for Timeline"
    }
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "Uncategorized", // TODO: Update category
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["toggle"],
    source: {
      type: "local",
      path: "components/docs/Toggle.tsx"
    },
    dependencies: ["clsx", "tailwind-merge"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/toggle"
    },
    docs: {
      slug: "/components/toggle",
      title: "Toggle",
      description: "Description for Toggle"
    }
  },
]