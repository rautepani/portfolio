export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  if (typeof fileContent !== 'string') {
    return { data: {}, content: '' };
  }

  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent.trim() };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  yamlBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let val: any = line.slice(colonIndex + 1).trim();

    if (!key) return;

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      try {
        val = JSON.parse(val);
      } catch {
        val = val
          .slice(1, -1)
          .split(',')
          .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    data[key] = val;
  });

  return { data, content };
}

// Dynamically import all `index.md` files from subfolders in src/blogs/
const modules = import.meta.glob('../blogs/*/index.md', { query: '?raw', eager: true });

export const posts: Post[] = Object.entries(modules).map(([filePath, mod]) => {
  const rawText = typeof mod === 'string' ? mod : (mod as any)?.default || '';
  const { data, content } = parseFrontmatter(rawText);
  const pathParts = filePath.split('/');
  const folderSlug = pathParts[pathParts.length - 2];

  return {
    slug: data.slug || folderSlug,
    title: data.title || folderSlug,
    date: data.date || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt || '',
    content,
  };
});

export function getLatestPosts(n = 3): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// Dynamically import all images inside src/blogs/
const imageModules = import.meta.glob('../blogs/**/*.{png,jpg,jpeg,svg,gif,webp}', { query: '?url', eager: true });

export function resolveBlogImageUrl(slug: string, src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const cleanSrc = src.replace(/^\.\//, '');
  const targetPath = `../blogs/${slug}/${cleanSrc}`;
  const mod = imageModules[targetPath];
  if (!mod) return src;
  return typeof mod === 'string' ? mod : (mod as any)?.default || src;
}

export function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
