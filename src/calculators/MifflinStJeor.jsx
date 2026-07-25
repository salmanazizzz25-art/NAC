import { useMemo, useState } from 'react';

const ACTIVITY_FACTORS = [
  { id: 'sedentary', label: 'Sedentary (little or no exercise)', value: 1.2 },
  { id: 'light', label: 'Light (exercise 1–3 days/week)', value: 1.375 },
  { id: 'moderate', label: 'Moderate (exercise 3–5 days/week)', value: 1.55 },
  { id: 'active', label: 'Active (exercise 6–7 days/week)', value: 1.725 },
  { id: 'very_active', label: 'Very active (hard exercise/physical job)', value: 1.9 },
];

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

export default function MifflinStJeor() {
  const [sex, setSex] = useState('female');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityId, setActivityId] = useState('sedentary');

  const inputsValid = isValidNumber(weight) && isValidNumber(height) && isValidNumber(age);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    const sexConstant = sex === 'male' ? 5 : -161;
    const bmr = 10 * w + 6.25 * h - 5 * a + sexConstant;
    const factor = ACTIVITY_FACTORS.find((f) => f.id === activityId)?.value ?? 1.2;
    const tee = bmr * factor;
    return { bmr, tee };
  }, [inputsValid, weight, height, age, sex, activityId]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Energy · Adult</span>
        <h2>Mifflin-St Jeor Equation</h2>
        <p className="calc-formula tabular">
          {sex === 'male'
            ? 'BMR = 10W + 6.25H − 5A + 5'
            : 'BMR = 10W + 6.25H − 5A − 161'}
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

        <label className="field-group">
          <span className="field-label">Age (years)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 24"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Activity level</span>
          <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
            {ACTIVITY_FACTORS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label} (×{f.value})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <>
            <div className="result-row">
              <span className="result-label">BMR</span>
              <span className="result-value tabular">{result.bmr.toFixed(0)} kcal/day</span>
            </div>
            <div className="result-row primary">
              <span className="result-label">Total Energy Expenditure</span>
              <span className="result-value tabular">{result.tee.toFixed(0)} kcal/day</span>
            </div>
          </>
        ) : (
          <p className="result-placeholder">Enter weight, height, and age to calculate.</p>
        )}
      </div>
    </div>
  );
}
