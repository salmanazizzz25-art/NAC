import { useMemo, useState } from 'react';

const CM_PER_INCH = 2.54;

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

export default function IdealBodyWeight() {
  const [sex, setSex] = useState('female');
  const [height, setHeight] = useState('');

  const inputsValid = isValidNumber(height);
  const heightInches = inputsValid ? Number(height) / CM_PER_INCH : null;
  const belowFiveFeet = heightInches !== null && heightInches < 60;

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const inches = Number(height) / CM_PER_INCH;
    const base = sex === 'male' ? 50 : 45.5;
    const ibw = base + 2.3 * (inches - 60);
    return {
      ibw,
      rangeLow: ibw * 0.9,
      rangeHigh: ibw * 1.1,
    };
  }, [inputsValid, height, sex]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Body Composition</span>
        <h2>Ideal Body Weight</h2>
        <p className="calc-formula tabular">
          {sex === 'male'
            ? 'IBW = 50 + 2.3 × (height in. − 60)'
            : 'IBW = 45.5 + 2.3 × (height in. − 60)'}
        </p>
      </div>

      <div className="calc-form">
        <div className="field-group" role="radiogroup" aria-label="Sex">
          <span className="field-label">Sex</span>
          <div className="segmented">
            <button
              type="button"
              className={sex === 'female' ? 'active' : ''}
              onClick={() => setSex('female')}
              aria-pressed={sex === 'female'}
            >
              Female
            </button>
            <button
              type="button"
              className={sex === 'male' ? 'active' : ''}
              onClick={() => setSex('male')}
              aria-pressed={sex === 'male'}
            >
              Male
            </button>
          </div>
        </div>

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

        {belowFiveFeet && (
          <p className="calc-note">
            Devine's formula was derived for heights of 5'0" (152 cm) and above.
            Below that, this estimate becomes less reliable.
          </p>
        )}
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <>
            <div className="result-row primary">
              <span className="result-label">Ideal Body Weight</span>
              <span className="result-value tabular">{result.ibw.toFixed(1)} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Healthy range (±10%)</span>
              <span className="result-value tabular">
                {result.rangeLow.toFixed(1)}–{result.rangeHigh.toFixed(1)} kg
              </span>
            </div>
          </>
        ) : (
          <p className="result-placeholder">Enter height to calculate.</p>
        )}
      </div>
    </div>
  );
}
