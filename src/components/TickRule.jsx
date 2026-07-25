export default function TickRule({ labelLeft, labelRight }) {
  const ticks = Array.from({ length: 61 });
  return (
    <div className="tick-rule">
      {labelLeft && <span className="tick-rule-label left tabular">{labelLeft}</span>}
      <svg viewBox="0 0 610 16" preserveAspectRatio="none" className="tick-rule-svg">
        <line x1="0" y1="1" x2="610" y2="1" stroke="var(--rule-strong)" strokeWidth="1" />
        {ticks.map((_, i) => (
          <line
            key={i}
            x1={i * 10}
            x2={i * 10}
            y1="1"
            y2={i % 5 === 0 ? 12 : 6}
            stroke={i % 5 === 0 ? 'var(--forest)' : 'var(--rule-strong)'}
            strokeWidth={i % 10 === 0 ? 1.5 : 1}
          />
        ))}
      </svg>
      {labelRight && <span className="tick-rule-label right tabular">{labelRight}</span>}
    </div>
  );
}
