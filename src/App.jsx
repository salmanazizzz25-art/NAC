import { useEffect, useState } from 'react';
import TickRule from './components/TickRule.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { calculators } from './calculators/registry.js';
import './App.css';

function getInitialTheme() {
  const stored = localStorage.getItem('nac-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nac-theme', theme);
  }, [theme]);

  const selected = calculators.find((c) => c.id === selectedId);
  const SelectedComponent = selected?.component;

  return (
    <div className="app-shell">
      <header className="app-header">
        <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
        <div className="app-header-inner">
          <span className="brand-mark">NAC</span>
          <h1>Nutrition Assessment Calculator</h1>
          <p className="app-tagline">
            One place for the equations you already know — entered once, calculated precisely.
          </p>
        </div>
        <TickRule labelLeft="00" labelRight="60" />
      </header>

      <main className="app-main">
        {!selected && (
          <section className="picker-section">
            <h2 className="picker-heading">Choose a calculation</h2>
            <div className="calc-grid">
              {calculators.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`calc-card${c.component ? '' : ' disabled'}`}
                  disabled={!c.component}
                  onClick={() => c.component && setSelectedId(c.id)}
                >
                  <span className="calc-card-category tabular">{c.category}</span>
                  <span className="calc-card-name">{c.name}</span>
                  <span className="calc-card-desc">{c.description}</span>
                  {!c.component && <span className="calc-card-badge">Coming soon</span>}
                </button>
              ))}
            </div>
          </section>
        )}

        {selected && (
          <section className="active-calc-section">
            <button type="button" className="back-link" onClick={() => setSelectedId(null)}>
              ← All calculators
            </button>
            <SelectedComponent />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Built for practising and student dietitians. Verify results against clinical judgment.</p>
      </footer>
    </div>
  );
}
