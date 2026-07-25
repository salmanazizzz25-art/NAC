import { useMemo, useState } from 'react';

function isValidNumber(v) {
  return v !== '' && !Number.isNaN(Number(v)) && Number(v) > 0;
}

function bmiScore(bmi) {
  if (bmi < 18.5) return 2;
  if (bmi <= 20) return 1;
  return 0;
}

function weightLossScore(percent) {
  if (percent > 10) return 2;
  if (percent >= 5) return 1;
  return 0;
}

const RISK_INFO = {
  0: {
    label: 'Low risk',
    action: 'Routine clinical care. Repeat screening periodically (e.g. weekly in hospital, monthly in care homes, annually in the community).',
  },
  1: {
    label: 'Medium risk',
    action: 'Observe. Document dietary intake for 3 days. If adequate, repeat screening; if inadequate, follow local policy to improve intake.',
  },
  2: {
    label: 'High risk',
    action: 'Treat. Refer to a dietitian or nutrition support team. Set goals, improve/increase nutritional intake, and monitor closely.',
  },
};

function riskFor(totalScore) {
  if (totalScore >= 2) return RISK_INFO[2];
  return RISK_INFO[totalScore];
}

export default function MustScore() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [usualWeight, setUsualWeight] = useState('');
  const [acuteIllness, setAcuteIllness] = useState(false);

  const inputsValid = isValidNumber(weight) && isValidNumber(height) && isValidNumber(usualWeight);

  const result = useMemo(() => {
    if (!inputsValid) return null;
    const w = Number(weight);
    const hM = Number(height) / 100;
    const bmi = w / (hM * hM);
    const usual = Number(usualWeight);
    const percentLoss = Math.max(0, ((usual - w) / usual) * 100);

    const s1 = bmiScore(bmi);
    const s2 = weightLossScore(percentLoss);
    const s3 = acuteIllness ? 2 : 0;
    const total = s1 + s2 + s3;

    return { bmi, percentLoss, s1, s2, s3, total, risk: riskFor(total) };
  }, [inputsValid, weight, height, usualWeight, acuteIllness]);

  return (
    <div className="calc-panel">
      <div className="calc-panel-header">
        <span className="eyebrow">Screening</span>
        <h2>MUST Score</h2>
        <p className="calc-formula tabular">Score = BMI score + weight loss score + acute disease score</p>
      </div>

      <div className="calc-form">
        <label className="field-group">
          <span className="field-label">Current weight (kg)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 58"
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
          <span className="field-label">Usual weight, 3–6 months ago (kg)</span>
          <input
            className="tabular"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={usualWeight}
            onChange={(e) => setUsualWeight(e.target.value)}
            placeholder="e.g. 63"
          />
        </label>

        <div className="field-group" role="radiogroup" aria-label="Acute disease effect">
          <span className="field-label">
            Acutely ill AND no nutritional intake for &gt;5 days?
          </span>
          <div className="segmented">
            <button
              type="button"
              className={!acuteIllness ? 'active' : ''}
              onClick={() => setAcuteIllness(false)}
              aria-pressed={!acuteIllness}
            >
              No
            </button>
            <button
              type="button"
              className={acuteIllness ? 'active' : ''}
              onClick={() => setAcuteIllness(true)}
              aria-pressed={acuteIllness}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div className="calc-result" aria-live="polite">
        {result ? (
          <>
            <div className="result-row">
              <span className="result-label">BMI ({result.bmi.toFixed(1)} kg/m²)</span>
              <span className="result-value tabular">{result.s1} pt</span>
            </div>
            <div className="result-row">
              <span className="result-label">Weight loss ({result.percentLoss.toFixed(1)}%)</span>
              <span className="result-value tabular">{result.s2} pt</span>
            </div>
            <div className="result-row">
              <span className="result-label">Acute disease effect</span>
              <span className="result-value tabular">{result.s3} pt</span>
            </div>
            <div className="result-row primary">
              <span className="result-label">Total score</span>
              <span className="result-value tabular">
                {result.total} — {result.risk.label}
              </span>
            </div>
            <p className="calc-note">{result.risk.action}</p>
          </>
        ) : (
          <p className="result-placeholder">
            Enter current weight, height, and usual weight to calculate.
          </p>
        )}
      </div>
    </div>
  );
}
