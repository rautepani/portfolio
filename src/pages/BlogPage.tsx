import { Link } from 'react-router-dom';
import { useState } from 'react';
import { posts } from '../data/posts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Collect all unique tags
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="blog-page-root">
      {/* Header bar */}
      <div className="blog-page-header">
        <Link to="/" className="blog-back-link">
          <ArrowLeft size={14} /> cd ~/home
        </Link>
        <span className="blog-page-title">biswash@nityaniyam:~/blog</span>
      </div>

      <main className="blog-page-main">
        <div className="sec-label">ls -la ~/blog/</div>
        <h1 className="sec-title" style={{ marginBottom: '28px' }}>All Posts</h1>

        {/* Tag filters */}
        <div className="blog-tag-filters">
          <button
            className={`blog-tag-btn${activeTag === null ? ' active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`blog-tag-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="blog-list">
          {sorted.length === 0 && (
            <div className="blog-empty">
              <span style={{ color: 'var(--amber)' }}>→ 0 entries found.</span>
            </div>
          )}
          {sorted.map((post) => (
            <Link
              key={post.slug}
              to={`/blogposts/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card-meta">
                <span className="blog-card-date">{post.date}</span>
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-excerpt">{post.excerpt}</div>
              <div className="blog-card-readmore">
                read post <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </div>
            </Link>
          ))}
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
