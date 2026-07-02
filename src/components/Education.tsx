export default function Education() {
  return (
    <section id="education">
      <div className="sec-label">git log --edu --oneline</div>
      <h2 className="sec-title">04. Education</h2>

      <div className="reveal">
        <div className="git-log">

          <div className="commit">
            <div className="chash">commit a1b2c3d</div>
            <div className="ctitle">Bachelor of Engineering : Software Engineering</div>
            <div className="cmeta">School of Engineering · Pokhara University</div>
            <div className="cmeta">2022 – 2026</div>
          </div>

          <div className="commit">
            <div className="chash">commit 9f8e7d6</div>
            <div className="ctitle">Higher Secondary Education : Science</div>
            <div className="cmeta">Shree Amarsingh Secondary School</div>
            <div className="cmeta">2020 – 2022</div>
          </div>

          <div className="commit">
            <div className="chash">commit 3c4d5e6</div>
            <div className="ctitle">Secondary Education Examination(SEE)</div>
            <div className="cmeta">Shree Amarsingh Secondary School</div>
            <div className="cmeta">2013 – 2020</div>
          </div>

        </div>
      </div>
    </section>
  );
}
