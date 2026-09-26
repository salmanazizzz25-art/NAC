import { useEffect, useRef } from 'react';

// Shows a clearly labelled Google AdSense unit once AdSense is set up.
// Until VITE_ADSENSE_CLIENT and VITE_ADSENSE_SLOT are filled in (.env),
// nothing renders, so there is never an empty box on the page.
const client = import.meta.env.VITE_ADSENSE_CLIENT;
const slot = import.meta.env.VITE_ADSENSE_SLOT;

export default function AdSlot() {
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or consent choices can stop ads loading; the app works regardless.
    }
  }, []);

  if (!client || !slot) return null;

  return (
    <aside className="ad-slot" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
