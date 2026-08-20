import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const IconHanger = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a1.6 1.6 0 1 1 1.6 1.6" />
    <path d="M12 4.6 3.6 10.4a1.8 1.8 0 0 0-.6 2.3c.14.3.45.5.8.5h16.4c.35 0 .66-.2.8-.5a1.8 1.8 0 0 0-.6-2.3Z" />
    <path d="M5.5 15h13" />
  </svg>
);

const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.6 2.6H20a1.4 1.4 0 0 1 1.4 1.4v7.4a1.4 1.4 0 0 1-.4 1L12 21a1.4 1.4 0 0 1-2 0l-7-7a1.4 1.4 0 0 1 0-2l9-9a1.4 1.4 0 0 1 .6-.4Z" />
    <circle cx="16.3" cy="7.7" r="1.2" />
  </svg>
);

const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2Z" />
    <path d="M3 8.2 12 13.4l9-5.2" />
    <path d="M12 13.4V21" />
  </svg>
);

const IconList = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 6h12" />
    <path d="M8.5 12h12" />
    <path d="M8.5 18h12" />
    <path d="M3.5 6h.01" />
    <path d="M3.5 12h.01" />
    <path d="M3.5 18h.01" />
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.2 3.6-7.2 8-7.2s8 3 8 7.2" />
  </svg>
);

const IconLogOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ACTIONS = [
  { to: '/categorias/cadastrar', label: 'Adicionar categoria', desc: 'Criar uma nova categoria', Icon: IconTag },
  { to: '/produtos/cadastrar', label: 'Adicionar produto', desc: 'Cadastrar peça no estoque', Icon: IconBox },
  { to: '/produtos/listar', label: 'Listar produtos', desc: 'Ver todas as peças cadastradas', Icon: IconList },
  { to: '/categorias/listar', label: 'Listar categorias', desc: 'Ver todas as categorias', Icon: IconGrid },
];

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ao carregar a página, pegar o nome do usuário salvo
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  // Fecha o menu do usuário ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token'); // caso use token JWT
    setUserName(null);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="bh-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .bh-root {
          --bg: #f7f3ff;
          --blush: #e8d6d4;
          --brown: #7f5539;
          --brown-dark: #4a2f1f;
          --brown-light: #a9785a;
          --text: #3d2b22;
          --white: #fffdfb;
          min-height: 100vh;
          width: 100%;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          color: var(--text);
          background:
            linear-gradient(160deg, rgba(247,243,255,0.55) 0%, rgba(232,214,212,0.6) 100%),
            url('/images/brecho.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: var(--blush);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .bh-root *, .bh-root *::before, .bh-root *::after { box-sizing: border-box; }

        .bh-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px clamp(16px, 4vw, 48px);
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255, 254, 251, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.4);
        }
        .bh-logo { display: flex; align-items: center; gap: 10px; }
        .bh-logo-mark {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--brown);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bh-logo-mark svg { width: 20px; height: 20px; }
        .bh-logo-text {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 22px;
          letter-spacing: 0.01em;
          line-height: 1;
        }
        .bh-logo-sub {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--brown-light);
          font-weight: 600;
          margin-top: 2px;
        }

        .bh-user { position: relative; }
        .bh-user-btn, .bh-login-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--brown-dark);
          color: var(--white);
          border: none;
          padding: 9px 16px;
          border-radius: 999px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }
        .bh-user-btn:hover, .bh-login-link:hover {
          background: var(--brown);
          transform: translateY(-1px);
        }
        .bh-user-btn svg { width: 17px; height: 17px; }
        .bh-chevron { width: 14px !important; height: 14px !important; transition: transform 0.2s ease; }
        .bh-chevron.open { transform: rotate(180deg); }

        .bh-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--white);
          border: 1px solid rgba(127,85,57,0.15);
          border-radius: 14px;
          box-shadow: 0 12px 28px rgba(74,47,31,0.18);
          padding: 6px;
          min-width: 170px;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: opacity 0.16s ease, transform 0.16s ease;
          z-index: 20;
        }
        .bh-dropdown.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .bh-dropdown button {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 10px 12px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: var(--brown-dark);
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .bh-dropdown button:hover { background: var(--blush); }
        .bh-dropdown svg { width: 16px; height: 16px; }

        .bh-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(24px, 6vh, 56px) 20px 64px;
        }

        .bh-hero {
          text-align: center;
          max-width: 560px;
          margin-bottom: clamp(32px, 6vh, 56px);
          background: rgba(255,253,251,0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 28px;
          padding: 32px clamp(20px, 5vw, 44px);
          box-shadow: 0 8px 30px rgba(74,47,31,0.12);
        }
        .bh-hero h1 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(28px, 4.4vw, 42px);
          line-height: 1.15;
          margin: 0 0 10px;
        }
        .bh-hero p { font-size: 15.5px; color: var(--brown-light); margin: 0; }

        .bh-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 18px;
          width: 100%;
          max-width: 760px;
        }

        .bh-tag {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--brown);
          border: 1.5px dashed rgba(127,85,57,0.45);
          clip-path: polygon(0 50%, 16% 0%, 100% 0%, 100% 100%, 16% 100%);
          padding: 20px 22px 20px 46px;
          text-decoration: none;
          color: var(--brown-dark);
          animation: bh-rise 0.5s ease both;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .bh-tag:nth-child(2) { animation-delay: 0.05s; }
        .bh-tag:nth-child(3) { animation-delay: 0.1s; }
        .bh-tag:nth-child(4) { animation-delay: 0.15s; }

        .bh-tag-hole {
          position: absolute;
          left: 17px;
          top: 50%;
          transform: translateY(-50%);
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid rgba(127,85,57,0.55);
          box-shadow: inset 0 1px 2px rgba(74,47,31,0.3);
        }

        .bh-tag-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--white);
          color: var(--brown);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .bh-tag-icon svg { width: 19px; height: 19px; }

        .bh-tag-label { display: block; font-weight: 700; font-size: 15px; line-height: 1.3; }
        .bh-tag-desc { font-size: 12.5px; color: var(--white); margin-top: 2px; }

        .bh-tag:hover {
          transform: translateY(-3px) rotate(-0.6deg);
          border-color: var(--brown);
          box-shadow: 0 14px 24px rgba(74,47,31,0.16);
        }
        .bh-tag:hover .bh-tag-icon { background: var(--brown); color: var(--white); }
        .bh-tag:focus-visible { outline: 2.5px solid var(--brown-dark); outline-offset: 3px; }

        @keyframes bh-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 520px) {
          .bh-tag { clip-path: none; border-radius: 14px; padding: 18px; }
          .bh-tag-hole { display: none; }
          .bh-logo-sub { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bh-tag, .bh-user-btn, .bh-login-link, .bh-dropdown { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header className="bh-navbar">
        <div className="bh-logo">
          <span className="bh-logo-mark"><IconHanger /></span>
          <div>
            <div className="bh-logo-text">brechick</div>
            <div className="bh-logo-sub">controle de estoque</div>
          </div>
        </div>

        {userName ? (
          <div className="bh-user" ref={menuRef}>
            <button
              type="button"
              className="bh-user-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
            >
              <IconUser />
              {userName}
              <span className={`bh-chevron ${menuOpen ? 'open' : ''}`}><IconChevron /></span>
            </button>
            <div className={`bh-dropdown ${menuOpen ? 'open' : ''}`}>
              <button type="button" onClick={handleLogout}>
                <IconLogOut />
                Sair
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="bh-login-link">
            <IconUser />
            Login
          </Link>
        )}
      </header>

      <main className="bh-main">
        <section className="bh-hero">
          <h1>{userName ? `Bem-vindo(a), ${userName}!` : 'Bem-vindo(a) ao Brechick!'}</h1>
          <p>Gerencie o estoque do seu brechó em um só lugar.</p>
        </section>

        <section className="bh-grid">
          {ACTIONS.map(({ to, label, desc, Icon }) => (
            <Link key={to} to={to} className="bh-tag">
              <span className="bh-tag-hole" />
              <span className="bh-tag-icon"><Icon /></span>
              <span>
                <span className="bh-tag-label">{label}</span>
                <span className="bh-tag-desc">{desc}</span>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
