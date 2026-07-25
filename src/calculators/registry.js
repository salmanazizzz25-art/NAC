import MifflinStJeor from './MifflinStJeor.jsx';

// Each entry: id, name, category, short description, component (null = not built yet)
export const calculators = [
  {
    id: 'mifflin-st-jeor',
    name: 'Mifflin-St Jeor',
    category: 'Energy',
    description: 'Resting energy expenditure — current standard for general adult use.',
    component: MifflinStJeor,
  },
  {
    id: 'harris-benedict',
    name: 'Harris-Benedict',
    category: 'Energy',
    description: 'Classic BMR equation, widely taught and still referenced.',
    component: null,
  },
  {
    id: 'bmi',
    name: 'BMI',
    category: 'Body Composition',
    description: 'Body mass index with WHO Asian cut-off option.',
    component: null,
  },
  {
    id: 'ideal-body-weight',
    name: 'Ideal Body Weight',
    category: 'Body Composition',
    description: 'Devine formula — used clinically for dosing and nutrition targets.',
    component: null,
  },
  {
    id: 'weight-loss-severity',
    name: '% Weight Loss / Severity',
    category: 'Screening',
    description: 'Unintentional weight loss over time, graded by severity.',
    component: null,
  },
  {
    id: 'protein-requirement',
    name: 'Protein Requirement',
    category: 'Macronutrients',
    description: 'Condition-based protein targets (renal, hepatic, critical care, wound healing).',
    component: null,
  },
  {
    id: 'fluid-needs',
    name: 'Fluid Needs',
    category: 'Fluids',
    description: '30–35 mL/kg adult method and Holliday-Segar for pediatric.',
    component: null,
  },
  {
    id: 'must-score',
    name: 'MUST Score',
    category: 'Screening',
    description: 'Malnutrition Universal Screening Tool.',
    component: null,
  },
];
