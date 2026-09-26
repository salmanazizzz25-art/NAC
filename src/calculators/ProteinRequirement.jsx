import { useMemo, useState } from 'react';

// g/kg/day ranges by condition. Each note names the guideline it comes from;
// full references are listed under the calculator.
const CLINICAL_CONDITIONS = [
  {
    id: 'healthy',
    label: 'Healthy adult (RDA)',
    low: 0.8,
    high: 0.8,
    note: 'Recommended Dietary Allowance for healthy adults (Institute of Medicine, 2005).',
  },
  {
    id: 'ckd-nondialysis-nondm',
    label: 'CKD stage 3–5, not on dialysis, no diabetes',
    low: 0.55,
    high: 0.6,
    note: 'KDOQI 2020, for metabolically stable adults under close supervision.',
  },
  {
    id: 'ckd-nondialysis-dm',
    label: 'CKD stage 3–5, not on dialysis, with diabetes',
    low: 0.6,
    high: 0.8,
    note: 'KDOQI 2020, for metabolically stable adults.',
  },
  {
    id: 'ckd-dialysis',
    label: 'CKD stage 5D, haemodialysis or peritoneal dialysis',
    low: 1.0,
    high: 1.2,
    note: 'KDOQI 2020, for metabolically stable adults.',
  },
  {
    id: 'aki-nondialysis',
    label: 'Acute kidney injury, not on dialysis',
    low: 0.8,
    high: 1.0,
    note: 'KDIGO 2012, for non-catabolic patients. Avoid restricting protein to delay dialysis.',
  },
  {
    id: 'aki-dialysis',
    label: 'Acute kidney injury, on dialysis or CRRT',
    low: 1.0,
    high: 1.5,
    note: 'KDIGO 2012: 1.0–1.5 g/kg on dialysis, up to 1.7 g/kg on CRRT or if hypercatabolic. ASPEN/SCCM 2016 allows up to 2.5 g/kg on CRRT.',
  },
  {
    id: 'critical-illness',
    label: 'Critically ill (BMI under 30)',
    low: 1.2,
    high: 2.0,
    note: 'ASPEN/SCCM 2016, using actual body weight. For BMI 30 and above, use the obesity presets below with ideal body weight.',
  },
  {
    id: 'critical-illness-obese-30-40',
    label: 'Critically ill, BMI 30–40 (enter ideal body weight)',
    low: 2.0,
    high: 2.0,
    note: 'ASPEN/SCCM 2016: 2.0 g/kg of ideal body weight. Enter ideal body weight, not actual weight.',
  },
  {
    id: 'critical-illness-obese-40',
    label: 'Critically ill, BMI 40 and above (enter ideal body weight)',
    low: 2.0,
    high: 2.5,
    note: 'ASPEN/SCCM 2016: up to 2.5 g/kg of ideal body weight. Enter ideal body weight, not actual weight.',
  },
  {
    id: 'liver-disease',
    label: 'Liver cirrhosis',
    low: 1.2,
    high: 1.5,
    note: 'ESPEN 2019: 1.2 g/kg if not malnourished, 1.5 g/kg if malnourished or sarcopenic. Use dry weight if there is ascites, and ideal body weight in obesity. Do not restrict protein in hepatic encephalopathy.',
  },
  {
    id: 'pressure-injury',
    label: 'Pressure injury (adults malnourished or at risk)',
    low: 1.25,
    high: 1.5,
    note: 'EPUAP/NPIAP/PPPIA 2019 pressure injury guideline.',
  },
  {
    id: 'major-surgery',
    label: 'Major surgery',
    low: 1.5,
    high: 1.5,
    note: 'ESPEN 2017 surgery guideline: 1.5 g/kg of ideal body weight, so enter ideal body weight.',
  },
  {
    id: 'trauma',
    label: 'Trauma (critically ill)',
    low: 1.2,
    high: 2.0,
    note: 'ASPEN/SCCM 2016: needs are likely at the upper end of this range.',
  },
];

const ATHLETIC_CONDITIONS = [
  {
    id: 'bulking',
    label: 'Bulking / muscle gain',
    low: 1.6,
    high: 2.2,
    note: 'With resistance training. A meta-analysis (Morton 2018) found gains levelled off around 1.6 g/kg, with 2.2 g/kg covering most people. ISSN 2017 suggests 1.4–2.0 g/kg for most exercising people.',
  },
  {
    id: 'cutting',
    label: 'Cutting / fat loss, keeping muscle',
    low: 1.6,
    high: 2.2,
    note: 'Uses the same 1.6–2.2 g/kg body weight range as bulking, based on Morton 2018. ISSN 2017 notes that lean, resistance-trained people in a calorie deficit may need more: 2.3–3.1 g per kg of fat-free mass (not body weight).',
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
        <h2 tabIndex={-1}>Protein Requirement</h2>
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
