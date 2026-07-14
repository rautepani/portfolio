import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { posts, getReadTime } from '../data/posts';
import {
  ArrowLeft,
  ArrowRight,
  Terminal,
  ShieldAlert,
  Bug,
  Lock,
  Radar,
  Cpu,
  Box,
} from 'lucide-react';

// Collect all unique tags
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

// Rotating decorative badge icons + gradient palettes for auto-generated
// cover art, since posts don't have real cover images yet.
const coverIcons = [Terminal, ShieldAlert, Bug, Lock, Radar, Cpu];
const coverPalettes = [
  ['rgba(67,216,138,0.28)', 'rgba(95,208,201,0.10)'],
  ['rgba(95,208,201,0.28)', 'rgba(67,216,138,0.10)'],
  ['rgba(242,169,59,0.26)', 'rgba(67,216,138,0.08)'],
  ['rgba(239,91,91,0.22)', 'rgba(95,208,201,0.08)'],
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = useMemo(
    () => sorted.slice(pageStart, pageStart + POSTS_PER_PAGE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageStart, activeTag]
  );

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag === activeTag ? null : tag);
    setPage(1);
  };

  return (
    <div className="blog-page-root">
      <main className="blog-page-main blog-listing-main">
        <div className="sec-label">ls -la ~/blog/</div>
        <h1 className="sec-title" style={{ marginBottom: '28px' }}>All Posts</h1>

        <div className="blog-listing-layout">
          <div className="blog-listing-content">
            <div className="blog-list blog-list-grid">
              {sorted.length === 0 && (
                <div className="blog-empty">
                  <span style={{ color: 'var(--amber)' }}>→ 0 entries found.</span>
                </div>
              )}
              {pagePosts.map((post) => {
                const hash = hashString(post.slug);
                const Icon = coverIcons[hash % coverIcons.length];
                const [c1, c2] = coverPalettes[hash % coverPalettes.length];
                const category = post.tags[0] ?? 'post';
                const readTime = getReadTime(post.content);

                return (
                  <Link
                    key={post.slug}
                    to={`/blogposts/${post.slug}`}
                    className="blog-card blog-card-with-cover"
                  >
                    <div
                      className="blog-cover"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${c1}, transparent 60%), radial-gradient(circle at 80% 80%, ${c2}, transparent 55%), var(--code-bg)`,
                      }}
                    >
                      <div className="blog-cover-badge">
                        <Icon size={16} color="var(--green)" />
                      </div>
                      <Box size={54} className="blog-cover-icon-main" />
                      <div className="blog-cover-title-row">
                        <div className="blog-cover-title">{post.title}</div>
                        <div className="blog-cover-underline" />
                      </div>
                    </div>

                    <div className="blog-card-body">
                      <div className="blog-card-eyebrow">— {category.toUpperCase()}</div>
                      <div className="blog-card-title">{post.title}</div>
                      <div className="blog-card-excerpt">{post.excerpt}</div>

                      <div className="blog-card-author">
                        <span className="blog-card-avatar">BD</span>
                        <span className="blog-card-author-meta">
                          nityaniyam · {post.date} — {readTime} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {sorted.length > 0 && (
              <div className="blog-pagination">
                <button
                  className="blog-page-btn"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ArrowLeft size={13} /> Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="blog-page-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Tag filters — sidebar on the right */}
          <aside className="blog-tag-sidebar">
            <div className="blog-tag-sidebar-label">filter by tag</div>
            <div className="blog-tag-filters blog-tag-filters-vertical">
              <button
                className={`blog-tag-btn${activeTag === null ? ' active' : ''}`}
                onClick={() => handleTagClick(null)}
              >
                all
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`blog-tag-btn${activeTag === tag ? ' active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>

      {/* Status bar */}
      <div className="statusbar">
        <span className="live">connection secure</span>
        <span>{sorted.length} post{sorted.length !== 1 ? 's' : ''} found</span>
        <span className="spacer" />
        <span>biswash@nityaniyam ~/blog</span>
      </div>
    </div>
  );
}
