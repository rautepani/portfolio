import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../data/posts';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

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
      {/* Header bar */}
      <div className="blog-page-header">
        <Link to="/blogposts" className="blog-back-link">
          <ArrowLeft size={14} /> cd ~/blog
        </Link>
        <span className="blog-page-title">biswash@nityaniyam:~/blog/{post.slug}</span>
      </div>

      <main className="blog-page-main blog-post-main">
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
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
