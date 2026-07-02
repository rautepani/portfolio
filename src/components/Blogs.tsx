export default function Blogs() {
  return (
    <section id="blogs">
      <div className="sec-label">cat blogs/index.md</div>
      <h2 className="sec-title">06. Blogs</h2>

      <div
        className="reveal"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '13px',
          color: 'var(--text-dim)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '20px 24px',
          background: 'var(--bg-card)',
        }}
      >
        $ ls blogs/
        <br />
        <span style={{ color: 'var(--amber)' }}>→ 0 entries found.</span> weekly HTB writeups + notes start
        dropping soon.
      </div>
    </section>
  );
}
