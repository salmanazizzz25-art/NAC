import { useMemo, useState } from 'react';

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

function hollidaySegar(weightKg) {
  if (weightKg <= 10) return weightKg * 100;
  if (weightKg <= 20) return 1000 + (weightKg - 10) * 50;
  return 1500 + (weightKg - 20) * 20;
}

export default function FluidNeeds() {
  const [mode, setMode] = useState('adult');
  const [weight, setWeight] = useState('');
  const [mlPerKg, setMlPerKg] = useState('30');

  const inputsValid = isValidNumber(weight);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const w = Number(weight);
    if (mode === 'adult') {
      const rate = Number(mlPerKg);
      return { low: w * 30, high: w * 35, singleRate: rate, single: w * rate };
    }
    return { daily: hollidaySegar(w), hourly: hollidaySegar(w) / 24 };
  }, [inputsValid, weight, mode, mlPerKg]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Fluids</span>
        <h2>Fluid Needs</h2>
        <p className="calc-formula tabular">
          {mode === 'adult' ? '30–35 mL/kg/day' : '100 / 50 / 20 mL/kg (Holliday-Segar)'}
        </p>
      </div>

      <div className="calc-form">
        <div className="field-group" role="radiogroup" aria-label="Population">
          <span className="field-label">Population</span>
          <div className="segmented">
            <button
              type="button"
              className={mode === 'adult' ? 'active' : ''}
              onClick={() => setMode('adult')}
              aria-pressed={mode === 'adult'}
            >
              Adult
            </button>
            <button
              type="button"
              className={mode === 'pediatric' ? 'active' : ''}
              onClick={() => setMode('pediatric')}
              aria-pressed={mode === 'pediatric'}
            >
              Pediatric
            </button>
          </div>
        </div>

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

        {mode === 'adult' && (
          <label className="field-group">
            <span className="field-label">Rate (mL/kg) for single-value estimate</span>
            <select value={mlPerKg} onChange={(e) => setMlPerKg(e.target.value)}>
              <option value="30">30 mL/kg (lower end)</option>
              <option value="32.5">32.5 mL/kg (midpoint)</option>
              <option value="35">35 mL/kg (upper end)</option>
            </select>
          </label>
        )}

        {mode === 'pediatric' && (
          <p className="calc-note">
            Holliday-Segar: 100 mL/kg for the first 10 kg, +50 mL/kg for the next 10 kg,
            +20 mL/kg for each kg above 20 kg. Adjust for fever, losses, or fluid restriction
            per clinical status.
          </p>
        )}
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          mode === 'adult' ? (
            <>
              <div className="result-row primary">
                <span className="result-label">Fluid range (30–35 mL/kg)</span>
                <span className="result-value tabular">
                  {result.low.toFixed(0)}–{result.high.toFixed(0)} mL/day
                </span>
              </div>
              <div className="result-row">
                <span className="result-label">At {result.singleRate} mL/kg</span>
                <span className="result-value tabular">{result.single.toFixed(0)} mL/day</span>
              </div>
            </>
          ) : (
            <>
              <div className="result-row primary">
                <span className="result-label">Daily maintenance</span>
                <span className="result-value tabular">{result.daily.toFixed(0)} mL/day</span>
              </div>
              <div className="result-row">
                <span className="result-label">Hourly rate</span>
                <span className="result-value tabular">{result.hourly.toFixed(1)} mL/hr</span>
              </div>
            </>
          )
        ) : (
          <p className="result-placeholder">Enter weight to calculate.</p>
        )}
      </div>
    </div>
  );
}
