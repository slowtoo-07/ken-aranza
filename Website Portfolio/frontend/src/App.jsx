import { useEffect, useState } from 'react';
import { profile } from './profile.js';
import {
  Briefcase, User, Flask, SquaresFour, Certificate, Target, ChatCircleText, Envelope, Phone, Paperclip,
  LinkedinLogo, GithubLogo, InstagramLogo, MapPin, Moon, Sun, PaperPlaneTilt, Images
} from '@phosphor-icons/react';

const SOCIAL = { LinkedIn: LinkedinLogo, GitHub: GithubLogo, Instagram: InstagramLogo };

const Card = ({ icon: Icon, title, children }) => (
  <section className="card reveal">
    <h2><Icon size={30} weight="bold" aria-hidden="true" />{title}</h2>
    {children}
  </section>
);

function Gallery({ photos }) {
  return (
    <Card icon={Images} title="Gallery">
      <div className="marquee" tabIndex={0} role="region" aria-label="Photo gallery">
        <ul className="track">
          {[...photos, ...photos].map((p, i) => (
            <li key={i} aria-hidden={i >= photos.length}>
              <img src={p.src} alt={i < photos.length ? p.alt : ''} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default function App() {
  const d = profile;
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [photo, setPhoto] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);

  // Fade sections in as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [d]);

  function send(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const body = `${f.message}\n\n— ${f.name} (${f.email})`;
    window.location.href = `mailto:${d.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(body)}`;
    setStatus('Opening your email app…');
  }


  const parts = d.name.split(' ');
  const initials = parts[0][0] + parts[parts.length - 1][0];
  const ic = { size: 26, weight: 'bold', 'aria-hidden': true };

  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <div className="wrap">
        <div className="bar">
          <button className="btn" onClick={() => setDark(v => !v)} aria-pressed={dark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <Sun {...ic} /> : <Moon {...ic} />}
          </button>
        </div>

        <header className="hero reveal">
          {photo
            ? <img className="avatar" src="ken.jpg" alt={`Portrait of ${d.name}`} onError={() => setPhoto(false)} />
            : <div className="avatar" aria-hidden="true">{initials}</div>}
          <div>
            <h1>{d.name}</h1>
            <p className="place"><MapPin {...ic} />{d.location}</p>
            <p>{d.title}</p>
          </div>
        </header>

        <main id="main">
          <div className="grid">
            <div className="stack">
              <Card icon={User} title="About">
                {d.summary.map(p => <p key={p}>{p}</p>)}
              </Card>
              <Card icon={Flask} title="Tech stack">
                {d.stack.map(g => (
                  <div key={g.name}>
                    <h3>{g.name}</h3>
                    <ul className="chips">{g.items.map(i => <li key={i}>{i}</li>)}</ul>
                  </div>
                ))}
              </Card>
            </div>
            <Card icon={Briefcase} title="Experience">
              <ol className="timeline">
                {d.experience.map(e => (
                  <li key={e.title}>
                    <h3>{e.title}</h3>
                    <span>{e.place}</span>
                    <span className="date">{e.date}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <div className="grid even">
            <Card icon={SquaresFour} title="Projects">
              {d.projects.map(p => (
                <article className="project" key={p.name}>
                  <h3>{p.name}</h3>
                  <p className="date">{p.period}</p>
                  {p.image && <img className="shot" src={p.image} alt={`Landing page screenshot of ${p.name}`} loading="lazy" />}
                  <ul>{p.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                </article>
              ))}
            </Card>
            <Card icon={Certificate} title="Certifications">
              <ul className="list">
                {d.certifications.map(c => (
                  <li key={c.title}><h3>{c.title}</h3><span>{c.place}</span> · <span className="date">{c.date}</span></li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid even">
            <Card icon={Target} title="Goals">
              <ul className="list">{d.goals.map(g => <li key={g}>{g}</li>)}</ul>
            </Card>
            <Card icon={Paperclip} title="Social links">
              <ul className="list links">
                {d.socials.map(s => {
                  const Icon = SOCIAL[s.name] || Paperclip;
                  return <li key={s.name}><a href={s.url} target="_blank" rel="noreferrer" aria-label={`${s.name} (opens in a new tab)`}><Icon {...ic} />{s.name}</a></li>;
                })}
              </ul>
            </Card>
          </div>

          <div className="gal">
            <Card icon={ChatCircleText} title="Contact">
              <div className="contact">
                <ul className="list links">
                  <li><a href={`mailto:${d.email}`}><Envelope {...ic} />{d.email}</a></li>
                  <li><a href={`tel:${d.phone.replace(/\s/g, '')}`}><Phone {...ic} />{d.phone}</a></li>
                </ul>
                <form onSubmit={send}>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" autoComplete="name" required />
                  <label htmlFor="email">Your email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" required />
                  <button className="btn solid" type="submit"><PaperPlaneTilt {...ic} />Send message</button>
                  <p role="status">{status}</p>
                </form>
              </div>
            </Card>
          </div>

          <Gallery photos={d.gallery} />
        </main>

        <footer>© {new Date().getFullYear()} {d.name}</footer>
      </div>
    </>
  );
}
