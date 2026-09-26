import { useEffect, useRef, useState } from 'react';
import TickRule from './components/TickRule.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { calculators } from './calculators/registry.js';
import AdSlot from './components/AdSlot.jsx';
import './App.css';

function getInitialTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem('nac-theme');
  } catch {
    // storage blocked (e.g. some private modes) — fall back to system theme
  }
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('nac-theme', next); // saved only when the user chooses
    } catch {
      // not saved; the theme still applies for this visit
    }
  }

  // Move keyboard/screen-reader focus with the view: to the calculator's
  // heading when one opens, and back to its card when returning to the list.
  const lastOpened = useRef(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (selectedId) {
      lastOpened.current = selectedId;
      document.querySelector('.calc-panel h2')?.focus();
    } else if (lastOpened.current) {
      document.querySelector(`[data-calc-id="${lastOpened.current}"]`)?.focus();
    }
  }, [selectedId]);

  // Wire calculator navigation into browser/app history so the Android
  // back button (and desktop back button) returns to the picker instead
  // of closing the app.
  useEffect(() => {
    // If the app opens directly on a calculator (e.g. #bmi after a restore),
    // put the picker underneath it in history so Back lands on the picker.
    const initialId = window.location.hash.slice(1);
    const base = window.location.pathname + window.location.search;
    if (initialId && calculators.some((c) => c.id === initialId && c.component)) {
      if (window.history.length <= 1) {
        // Fresh launch straight onto a calculator: add the list underneath it.
        window.history.replaceState(null, '', base);
        window.history.pushState({ calcId: initialId }, '', `${base}#${initialId}`);
      } else {
        // Returning via Back (e.g. from the Privacy page): keep history as it is.
        window.history.replaceState({ calcId: initialId }, '', `${base}#${initialId}`);
      }
      setSelectedId(initialId);
    } else if (window.location.hash) {
      window.history.replaceState(null, '', base);
    }

    function handlePopState(event) {
      const fromHash = window.location.hash.slice(1);
      const hashIsCalc = calculators.some((c) => c.id === fromHash && c.component);
      setSelectedId(event.state?.calcId ?? (hashIsCalc ? fromHash : null));
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function openCalculator(id) {
    window.history.pushState({ calcId: id }, '', `${window.location.pathname}${window.location.search}#${id}`);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  function goBackToPicker() {
    if (selectedId !== null) {
      window.history.back();
    }
  }

  const selected = calculators.find((c) => c.id === selectedId);
  const SelectedComponent = selected?.component;

  return (
    <div className="app-shell">
      <header className="app-header">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div className="app-header-inner">
          <span className="brand-mark">NAC</span>
          <h1>Nutrition Assessment Calculator</h1>
          <p className="app-tagline">
            The equations you already know, with sources, in one place.
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
                  data-calc-id={c.id}
                  type="button"
                  className={`calc-card${c.component ? '' : ' disabled'}`}
                  disabled={!c.component}
                  onClick={() => c.component && openCalculator(c.id)}
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
            <button type="button" className="back-link" onClick={goBackToPicker}>
              ← All calculators
            </button>
            <SelectedComponent />
            {selected.about && (
              <section className="calc-about" aria-labelledby="about-heading">
                <h3 id="about-heading">About this calculation</h3>
                {selected.about.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                <h4>References</h4>
                <ol className="calc-refs">
                  {selected.references.map((ref) => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ol>
              </section>
            )}
          </section>
        )}
      </main>

      <AdSlot />

      <footer className="app-footer">
        <p>
          For educational and professional support only. NAC does not replace clinical judgment,
          and results should be checked before use in patient care.
        </p>
        <nav className="footer-links" aria-label="Site">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </footer>
    </div>
  );
}
