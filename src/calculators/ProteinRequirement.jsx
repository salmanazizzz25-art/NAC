import { useMemo, useState } from 'react';

// g/kg ranges by condition, drawn from ASPEN/KDOQI-referenced clinical guidance
const CLINICAL_CONDITIONS = [
  {
    id: 'healthy',
    label: 'Healthy adult (RDA)',
    low: 0.8,
    high: 0.8,
    note: 'Standard RDA for healthy adults.',
  },
  {
    id: 'ckd-nondialysis-nondm',
    label: 'CKD stage 3–5, non-dialysis, no diabetes',
    low: 0.55,
    high: 0.6,
    note: 'Low-protein diet approach.',
  },
  {
    id: 'ckd-nondialysis-dm',
    label: 'CKD stage 3–5, non-dialysis, with diabetes',
    low: 0.6,
    high: 0.8,
    note: '',
  },
  {
    id: 'ckd-dialysis',
    label: 'CKD stage 5D — hemodialysis or peritoneal dialysis',
    low: 1.0,
    high: 1.2,
    note: 'Adjust based on metabolic stability.',
  },
  {
    id: 'aki-nondialysis',
    label: 'Acute kidney injury, not on dialysis',
    low: 0.8,
    high: 1.0,
    note: 'Avoid protein restriction to prevent/delay dialysis.',
  },
  {
    id: 'aki-dialysis',
    label: 'Acute kidney injury, on dialysis / CRRT',
    low: 1.0,
    high: 1.5,
    note: 'Up to 1.7 g/kg if on CRRT and/or hypermetabolic (max 2.5 g/kg).',
  },
  {
    id: 'critical-illness',
    label: 'Critically ill (BMI < 30)',
    low: 1.2,
    high: 2.0,
    note: 'For BMI 30–40, use 2 g/kg of ideal weight; BMI > 40, use 2.5 g/kg of ideal weight.',
  },
  {
    id: 'liver-disease',
    label: 'Liver disease (cirrhosis, hepatic encephalopathy)',
    low: 1.0,
    high: 1.5,
    note: '',
  },
  {
    id: 'pressure-injury',
    label: 'Pressure injury / wound healing',
    low: 1.25,
    high: 1.5,
    note: '',
  },
  {
    id: 'major-surgery',
    label: 'Major surgery',
    low: 1.5,
    high: 2.0,
    note: '',
  },
  {
    id: 'trauma',
    label: 'Trauma',
    low: 1.2,
    high: 2.0,
    note: 'Typically dosed at the upper end of this range.',
  },
];

const ATHLETIC_CONDITIONS = [
  {
    id: 'bulking',
    label: 'Bulking / muscle gain',
    low: 1.6,
    high: 2.2,
    note: 'Resistance-trained, calorie surplus. Intakes above ~2.0 g/kg show no added benefit for muscle growth.',
  },
  {
    id: 'cutting',
    label: 'Cutting / fat loss, muscle preservation',
    low: 1.6,
    high: 2.2,
    note: 'Most people don\u2019t need more than this even in a deficit. Lean, experienced athletes in an aggressive cut sometimes go up to 2.4 g/kg.',
  },
];

const CONDITIONS = [...CLINICAL_CONDITIONS, ...ATHLETIC_CONDITIONS];

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

export default function ProteinRequirement() {
  const [weight, setWeight] = useState('');
  const [conditionId, setConditionId] = useState('healthy');

  const condition = CONDITIONS.find((c) => c.id === conditionId);
  const inputsValid = isValidNumber(weight);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const w = Number(weight);
    return {
      low: w * condition.low,
      high: w * condition.high,
    };
  }, [inputsValid, weight, condition]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Macronutrients</span>
        <h2>Protein Requirement</h2>
        <p className="calc-formula tabular">
          Protein (g/day) = weight (kg) × g/kg range
        </p>
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
          <span className="field-label">Condition</span>
          <select value={conditionId} onChange={(e) => setConditionId(e.target.value)}>
            <optgroup label="Clinical">
              {CLINICAL_CONDITIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} ({c.low === c.high ? `${c.low}` : `${c.low}–${c.high}`} g/kg)
                </option>
              ))}
            </optgroup>
            <optgroup label="Athletic / Fitness">
              {ATHLETIC_CONDITIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} ({c.low}–{c.high} g/kg)
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        {condition.note && <p className="calc-note">{condition.note}</p>}
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <div className="result-row primary">
            <span className="result-label">Protein requirement</span>
            <span className="result-value tabular">
              {result.low.toFixed(0)}
              {result.high !== result.low ? `–${result.high.toFixed(0)}` : ''} g/day
            </span>
          </div>
        ) : (
          <p className="result-placeholder">Enter weight to calculate.</p>
        )}
      </div>
    </div>
  );
}
