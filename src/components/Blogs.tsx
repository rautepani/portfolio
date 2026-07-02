import { Link } from 'react-router-dom';
import { getLatestPosts } from '../data/posts';
import { ArrowRight } from 'lucide-react';

export default function Blogs() {
  const latest = getLatestPosts(3);

  return (
    <section id="blogs">
      <div className="sec-label">cat blogs/index.md</div>
      <h2 className="sec-title">06. Blogs</h2>

      <div className="blog-list reveal">
        {latest.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
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

      <div className="blog-viewall">
        <Link to="/blog" className="blog-viewall-link">
          <span className="blog-viewall-prompt">$</span> ls -la blogs/ --all
          <ArrowRight size={14} style={{ marginLeft: '8px', display: 'inline', verticalAlign: 'middle' }} />
        </Link>
      </div>
    </section>
  );
}
