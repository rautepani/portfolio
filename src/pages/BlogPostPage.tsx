import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, resolveBlogImageUrl } from '../data/posts';
import { ArrowLeft } from 'lucide-react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function extractHeadings(content: string): { text: string; slug: string; depth: number }[] {
  const lines = content.split('\n');
  const headings: { text: string; slug: string; depth: number }[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      headings.push({ text, slug: slugify(text), depth });
    }
  }
  return headings;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [activeSlug, setActiveSlug] = useState<string>('');

  const headings = post ? extractHeadings(post.content) : [];

  useEffect(() => {
    if (!post || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.slug, headings.length]);

  if (!post) {
    return (
      <div className="blog-page-root">
        <div className="blog-page-header">
          <Link to="/blogposts" className="blog-back-link">
            <ArrowLeft size={14} /> cd ~/blog
          </Link>
          <span className="blog-page-title">biswash@nityaniyam:~/blog/404</span>
        </div>
        <main className="blog-page-main">
          <div style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)', marginTop: '60px' }}>
            <div style={{ color: 'var(--red)' }}>Error: post not found — "{slug}"</div>
            <div style={{ marginTop: '12px' }}>
              <span style={{ color: 'var(--green)' }}>$</span>{' '}
              <button
                onClick={() => navigate('/blogposts')}
                style={{ background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '15px', textDecoration: 'underline dotted' }}
              >
                cd ~/blog
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="blog-page-root">
      <main className="blog-page-main blog-post-main">
        <div className="blog-post-layout">
          {headings.length > 0 && (
            <aside className="blog-toc-sidebar">
              <div className="blog-tag-sidebar-label">On this page</div>
              <nav className="blog-toc-list">
                {headings.map((h) => (
                  <a
                    key={h.slug}
                    href={`#${h.slug}`}
                    className={[
                      'blog-toc-link',
                      h.depth === 3 ? 'blog-toc-link-sub' : '',
                      activeSlug === h.slug ? 'active' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          <div className="blog-post-main-col">
            {/* Post header */}
            <div className="blog-post-header">
              <div className="blog-card-meta" style={{ marginBottom: '14px' }}>
                <span className="blog-card-date">{post.date}</span>
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">#{tag}</span>
                  ))}
                </div>
              </div>
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <div className="blog-post-divider" />
            </div>

            {/* Markdown body */}
            <article className="blog-post-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
                  h3: ({ children }) => <h3 id={slugify(String(children))}>{children}</h3>,
                  img: ({ src, alt }) => {
                    const resolvedSrc = src ? resolveBlogImageUrl(post.slug, src) : src;
                    return <img src={resolvedSrc} alt={alt || ''} />;
                  },
                  pre: ({ children }) => (
                    <div className="blog-code-window">
                      <div className="blog-code-header">
                        <span style={{ background: '#ef5b5b' }} />
                        <span style={{ background: '#f2a93b' }} />
                        <span style={{ background: '#43d88a' }} />
                      </div>
                      <pre>{children}</pre>
                    </div>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </main>

      {/* Status bar */}
      <div className="statusbar">
        <span className="live">connection secure</span>
        <span>reading: {post.title}</span>
        <span className="spacer" />
        <span>biswash@nityaniyam ~/blog/{post.slug}</span>
      </div>
    </div>
  );
}
