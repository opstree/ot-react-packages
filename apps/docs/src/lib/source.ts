import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// @ts-ignore
const pages = import.meta.glob('../content/docs/**/*.mdx', { eager: true });
// @ts-ignore
const metas = import.meta.glob('../content/docs/**/meta.json', { eager: true });
function createSource(pages: any, metas: any) {
  const files: any[] = [];

  for (const [path, data] of Object.entries(pages)) {
    const module = data as any;
    const relativePath = path.replace('../content/docs/', '');
    const slugs = relativePath.replace(/\.mdx$/, '').split('/');
    if (slugs[slugs.length - 1] === 'index') slugs.pop();

    files.push({
      type: 'page',
      path: relativePath,
      data: {
        ...(module.frontmatter || {}),
        body: module.default,
        toc: module.toc,
        structuredData: module.structuredData,
        _exports: module,
      },
      slugs: slugs
    });
  }

  for (const [path, data] of Object.entries(metas)) {
    const relativePath = path.replace('../content/docs/', '');
    files.push({
      type: 'meta',
      path: relativePath,
      data: (data as any).default || data,
    });
  }

  return { files };
}

export const source = loader({
  baseUrl: '/docs',
  source: createSource(pages, metas),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  console.log(page);
  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}
