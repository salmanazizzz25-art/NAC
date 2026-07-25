import { useMemo, useState } from 'react';

const TIME_FRAMES = [
  { id: '1w', label: '1 week', significant: 1, severe: 2 },
  { id: '1m', label: '1 month', significant: 5, severe: 5 },
  { id: '3m', label: '3 months', significant: 7.5, severe: 7.5 },
  { id: '6m', label: '6 months', significant: 10, severe: 10 },
];

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

function classify(percentLoss, frame) {
  if (percentLoss <= 0) return { label: 'No loss (weight stable or gained)', tier: 'none' };
  if (frame.id === '1w') {
    if (percentLoss > frame.severe) return { label: 'Severe weight loss', tier: 'severe' };
    if (percentLoss >= frame.significant) return { label: 'Significant weight loss', tier: 'significant' };
    return { label: 'Below significant threshold', tier: 'none' };
  }
  if (percentLoss > frame.severe) return { label: 'Severe weight loss', tier: 'severe' };
  if (percentLoss >= frame.significant) return { label: 'Significant weight loss', tier: 'significant' };
  return { label: 'Below significant threshold', tier: 'none' };
}

export default function WeightLossSeverity() {
  const [usualWeight, setUsualWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [frameId, setFrameId] = useState('1m');

  const inputsValid = isValidNumber(usualWeight) && isValidNumber(currentWeight);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const usual = Number(usualWeight);
    const current = Number(currentWeight);
    const percentLoss = ((usual - current) / usual) * 100;
    const frame = TIME_FRAMES.find((f) => f.id === frameId);
    const { label, tier } = classify(percentLoss, frame);
    return { percentLoss, label, tier, frame };
  }, [inputsValid, usualWeight, currentWeight, frameId]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Screening</span>
        <h2>% Weight Loss / Severity</h2>
        <p className="calc-formula tabular">
          % change = [(usual − actual) ÷ usual] × 100
        </p>
      </div>

      <div className="calc-form">
        <label className="field-group">
          <span className="field-label">Usual weight (kg)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={usualWeight}
            onChange={(e) => setUsualWeight(e.target.value)}
            placeholder="e.g. 70"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Current weight (kg)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="e.g. 65"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Time period</span>
          <select value={frameId} onChange={(e) => setFrameId(e.target.value)}>
            {TIME_FRAMES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <p className="calc-note">
          Based on Blackburn et al. (1977) criteria — significant loss:{' '}
          {TIME_FRAMES.find((f) => f.id === frameId)?.significant}%, severe loss: &gt;
          {TIME_FRAMES.find((f) => f.id === frameId)?.severe}% over{' '}
          {TIME_FRAMES.find((f) => f.id === frameId)?.label}.
        </p>
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <>
            <div className="result-row primary">
              <span className="result-label">Weight change</span>
              <span className="result-value tabular">
                {result.percentLoss >= 0 ? '−' : '+'}
                {Math.abs(result.percentLoss).toFixed(1)}%
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">Classification</span>
              <span
                className="result-value"
                style={{
                  color:
                    result.tier === 'severe'
                      ? 'var(--error)'
                      : result.tier === 'significant'
                      ? 'var(--gold)'
                      : 'var(--ink)',
                }}
              >
                {result.label}
              </span>
            </div>
          </>
        ) : (
          <p className="result-placeholder">Enter usual and current weight to calculate.</p>
        )}
      </div>
    </div>
  );
}
