import { codeToHtml } from "shiki"
import fs from 'fs-extra'
import path from 'path'

export function componentApi() {
    return {
        name: 'component-api',
        configureServer(server: any) {
            server.middlewares.use(async (req: any, res: any, next: any) => {
                const url = new URL(req.url, `http://${req.headers.host}`);
                const rootDir = process.cwd();

                if (url.pathname === '/api/source' && req.method === 'GET') {
                    const src = url.searchParams.get('src');
                    if (!src) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'src parameter is required' }));
                        return;
                    }

                    try {
                        const filePath = path.resolve(rootDir, src);
                        if (!await fs.pathExists(filePath)) {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ error: `File not found: ${src}` }));
                            return;
                        }

                        const code = await fs.readFile(filePath, 'utf-8');
                        const lang = url.searchParams.get('lang') || src.split('.').pop() || 'tsx';

                        const highlightedCode = await codeToHtml(code, {
                            lang: lang,
                            themes: {
                                light: 'nord',
                                dark: 'nord',
                            },
                            transformers: [
                                {
                                    pre(node: any) {
                                        node.properties["class"] =
                                            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent"
                                    },
                                    code(node: any) {
                                        node.properties["data-line-numbers"] = ""
                                    },
                                    line(node: any) {
                                        node.properties["data-line"] = ""
                                    },
                                },
                            ],
                        });

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ code, highlightedCode }));
                    } catch (err: any) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: err.message }));
                    }
                    return;
                }

                if (url.pathname === '/api/template' && req.method === 'POST') {
                    let body = '';
                    req.on('data', (chunk: any) => { body += chunk; });
                    req.on('end', async () => {
                        try {
                            const data = JSON.parse(body);
                            const { name, category, code, dependencies } = data;
                            const id = name.toLowerCase().replace(/\s+/g, '-');

                            // 1. Save TSX file
                            const tsxPath = path.resolve(rootDir, `src/components/docs/${name}.tsx`);
                            await fs.writeFile(tsxPath, code);

                            // 2. Create MDX file
                            const mdxContent = `---
title: ${name}
description: ${data.description || `Documentation for ${name}`}
---

import { ${name} } from "../../../components/docs/${name}"
import { DocsPreview } from "../../../components/docspagescomponent/DocSurface"

## Preview

<DocsPreview title="${name}">
  <${name} />
</DocsPreview>
`;
                            const mdxPath = path.resolve(rootDir, `src/content/docs/components/${id}.mdx`);
                            await fs.writeFile(mdxPath, mdxContent);

                            // 3. Update docsConfig (Sidebar)
                            const docsConfigPath = path.resolve(rootDir, 'src/config/docs.tsx');
                            let docsConfigContent = await fs.readFile(docsConfigPath, 'utf-8');
                            const sidebarItem = `                {
                    title: "${name}",
                    href: "/docs/components/${id}",
                    items: [],
                },
                // @insert:component`;
                            docsConfigContent = docsConfigContent.replace('// @insert:component', sidebarItem);
                            await fs.writeFile(docsConfigPath, docsConfigContent);

                            // 4. Update registry/components.ts
                            const registryPath = path.resolve(rootDir, 'registry/components.ts');
                            let registryContent = await fs.readFile(registryPath, 'utf-8');
                            const registryItem = `,
    {
      id: "${id}",
      name: "${name}",
      category: "${category}",
      framework: "react",
      version: "1.0.0",
      status: "stable",
      tags: [],
      source: {
        type: "local",
        path: "components/docs/${name}.tsx"
      },
      dependencies: ${JSON.stringify(dependencies || [])},
      docs: {
        slug: "/components/${id}",
        title: "${name}",
        description: "${data.description || `Used for ${name}`}"
      }
    }
  ]`;
                            registryContent = registryContent.replace(/\s*\]\s*$/, registryItem);
                            await fs.writeFile(registryPath, registryContent);

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, message: 'Component added successfully!' }));
                        } catch (err: any) {
                            console.error(err);
                            res.statusCode = 500;
                            res.end(JSON.stringify({ success: false, error: err }));
                        }
                    });
                    return;
                }

                next();
            });
        },
    };
}
