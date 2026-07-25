import { useMemo, useState } from 'react';

const STANDARD_RANGES = [
  { label: 'Underweight', max: 18.5 },
  { label: 'Normal weight', max: 25 },
  { label: 'Overweight', max: 30 },
  { label: 'Obese', max: Infinity },
];

const ASIAN_RANGES = [
  { label: 'Underweight', max: 18.5 },
  { label: 'Normal weight', max: 23 },
  { label: 'Overweight (at risk)', max: 25 },
  { label: 'Obese I', max: 30 },
  { label: 'Obese II', max: Infinity },
];

function classify(bmi, ranges) {
  return ranges.find((r) => bmi < r.max)?.label ?? ranges[ranges.length - 1].label;
}

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

export default function BMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [cutoff, setCutoff] = useState('standard');

  const inputsValid = isValidNumber(weight) && isValidNumber(height);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const w = Number(weight);
    const hM = Number(height) / 100;
    const bmi = w / (hM * hM);
    const ranges = cutoff === 'asian' ? ASIAN_RANGES : STANDARD_RANGES;
    return { bmi, category: classify(bmi, ranges) };
  }, [inputsValid, weight, height, cutoff]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Body Composition</span>
        <h2>BMI</h2>
        <p className="calc-formula tabular">BMI = weight (kg) ÷ height (m)²</p>
      </div>

      <div className="calc-form">
        <label className="field-group">
          <span className="field-label">Weight (kg)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 62"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Height (cm)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 165"
          />
        </label>

        <div className="field-group" role="radiogroup" aria-label="Cut-off standard">
          <span className="field-label">Cut-off standard</span>
          <div className="segmented">
            <button
              type="button"
              className={cutoff === 'standard' ? 'active' : ''}
              onClick={() => setCutoff('standard')}
              aria-pressed={cutoff === 'standard'}
            >
              WHO Standard
            </button>
            <button
              type="button"
              className={cutoff === 'asian' ? 'active' : ''}
              onClick={() => setCutoff('asian')}
              aria-pressed={cutoff === 'asian'}
            >
              WHO Asian
            </button>
          </div>
        </div>
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <>
            <div className="result-row primary">
              <span className="result-label">BMI</span>
              <span className="result-value tabular">{result.bmi.toFixed(1)} kg/m²</span>
            </div>
            <div className="result-row">
              <span className="result-label">Category</span>
              <span className="result-value">{result.category}</span>
            </div>
          </>
        ) : (
          <p className="result-placeholder">Enter weight and height to calculate.</p>
        )}
      </div>
    </div>
  );
}
