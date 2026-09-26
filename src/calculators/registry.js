import MifflinStJeor from './MifflinStJeor.jsx';
import HarrisBenedict from './HarrisBenedict.jsx';
import BMI from './BMI.jsx';
import IdealBodyWeight from './IdealBodyWeight.jsx';
import WeightLossSeverity from './WeightLossSeverity.jsx';
import ProteinRequirement from './ProteinRequirement.jsx';
import FluidNeeds from './FluidNeeds.jsx';
import MustScore from './MustScore.jsx';

// Each entry: id, name, category, short description, component,
// `about` (paragraphs shown under the calculator) and `references` (sources).
export const calculators = [
  {
    id: 'mifflin-st-jeor',
    name: 'Mifflin-St Jeor',
    category: 'Energy',
    description: 'Resting energy expenditure for adults, from weight, height, age and sex.',
    component: MifflinStJeor,
    about: [
      'Estimates resting energy expenditure (REE), the energy the body uses at rest. Multiplying REE by an activity factor gives an estimate of total daily energy expenditure (TEE).',
      "In the Academy of Nutrition and Dietetics' evidence review of predictive equations, Mifflin-St Jeor predicted resting energy expenditure within 10% of measured values for more healthy adults (normal weight and obese) than the other equations tested.",
      'The activity factors (1.2 to 1.9) are commonly used approximate multipliers, not part of the original equation. Results are estimates; indirect calorimetry remains the reference method where available.',
    ],
    references: [
      'Mifflin MD, St Jeor ST, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241–247.',
      'Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review. J Am Diet Assoc. 2005;105(5):775–789.',
    ],
  },
  {
    id: 'harris-benedict',
    name: 'Harris-Benedict',
    category: 'Energy',
    description: 'Classic BMR equation (1984 revised version), widely taught.',
    component: HarrisBenedict,
    about: [
      'NAC uses the 1984 revision of the Harris-Benedict equation by Roza and Shizgal, not the original 1918–1919 coefficients. The two versions give different results, so check which one a textbook or exam expects.',
      'Harris-Benedict tends to overestimate energy needs in many modern populations compared with Mifflin-St Jeor. It is included because it is still widely taught and referenced.',
      'Activity factors are the same approximate multipliers used in the Mifflin-St Jeor calculator.',
    ],
    references: [
      'Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40(1):168–182.',
      'Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci USA. 1918;4(12):370–373.',
    ],
  },
  {
    id: 'bmi',
    name: 'BMI',
    category: 'Body Composition',
    description: 'Body mass index with standard WHO and Asia-Pacific cut-offs.',
    component: BMI,
    about: [
      'Body mass index is weight in kilograms divided by height in metres squared. It is a population screening measure and does not distinguish muscle from fat or show where fat is stored.',
      'The WHO standard categories are used internationally. Asian populations tend to have higher health risk at lower BMI values, so the Asia-Pacific classification uses lower cut-offs (normal under 23, at risk 23–24.9, obese I 25–29.9, obese II 30 and above).',
      'BMI categories here are for adults. Children and adolescents need BMI-for-age growth charts instead.',
    ],
    references: [
      'World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Geneva: WHO; 2000.',
      'WHO Western Pacific Region, IASO, IOTF. The Asia-Pacific perspective: redefining obesity and its treatment. Sydney: Health Communications Australia; 2000.',
      'WHO Expert Consultation (kept the international categories but added public-health action points for Asian populations at 23, 27.5, 32.5 and 37.5). Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies. Lancet. 2004;363(9403):157–163.',
    ],
  },
  {
    id: 'ideal-body-weight',
    name: 'Ideal Body Weight',
    category: 'Body Composition',
    description: 'Devine formula, often used as a reference weight in clinical calculations.',
    component: IdealBodyWeight,
    about: [
      'The Devine formula was first published to help calculate drug doses, and it is now widely used as a reference weight in clinical nutrition, for example when a guideline asks for protein per kg of ideal body weight.',
      'It uses height only (50 kg for men or 45.5 kg for women at 5 feet, plus 2.3 kg per inch above that). It was not designed for people shorter than 5 feet, and it is not a target weight for any individual.',
      'The ±10% range shown is a commonly used convention, not part of the original formula.',
    ],
    references: [
      'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650–655.',
    ],
  },
  {
    id: 'weight-loss-severity',
    name: '% Weight Loss / Severity',
    category: 'Screening',
    description: 'Unintentional weight loss over time, graded by severity.',
    component: WeightLossSeverity,
    about: [
      'Percentage weight change compares current weight with usual weight. How much loss matters depends on how quickly it happened, so the same percentage is graded differently over one week, one month, three months or six months.',
      'NAC grades the result using the time-based thresholds from Blackburn and colleagues, which are still widely used in nutrition assessment. Unintentional weight loss should always be interpreted alongside intake, illness and fluid status.',
    ],
    references: [
      'Blackburn GL, Bistrian BR, Maini BS, Schlamm HT, Smith MF. Nutritional and metabolic assessment of the hospitalized patient. JPEN J Parenter Enteral Nutr. 1977;1(1):11–22.',
    ],
  },
  {
    id: 'protein-requirement',
    name: 'Protein Requirement',
    category: 'Macronutrients',
    description: 'Guideline-based protein targets for clinical conditions and training goals.',
    component: ProteinRequirement,
    about: [
      'Multiplies body weight by a guideline range in grams of protein per kilogram per day. Each preset shows which guideline it comes from in its note.',
      'Some guidelines specify ideal or adjusted body weight rather than actual weight (for example major surgery, and critical illness with obesity). Enter the weight the guideline asks for.',
      'These are starting points for assessment. Individual needs depend on clinical status, kidney and liver function, and monitoring.',
    ],
    references: [
      'Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. Washington, DC: National Academies Press; 2005.',
      'Ikizler TA, Burrowes JD, et al. KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis. 2020;76(3 Suppl 1):S1–S107.',
      'Kidney Disease: Improving Global Outcomes (KDIGO) AKI Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1–138.',
      'McClave SA, Taylor BE, et al. Guidelines for the provision and assessment of nutrition support therapy in the adult critically ill patient (SCCM and ASPEN). JPEN. 2016;40(2):159–211.',
      'Plauth M, Bernal W, et al. ESPEN guideline on clinical nutrition in liver disease. Clin Nutr. 2019;38(2):485–521.',
      'Weimann A, Braga M, et al. ESPEN guideline: clinical nutrition in surgery. Clin Nutr. 2017;36(3):623–650.',
      'European Pressure Ulcer Advisory Panel, National Pressure Injury Advisory Panel, Pan Pacific Pressure Injury Alliance. Prevention and Treatment of Pressure Ulcers/Injuries: Clinical Practice Guideline. 2019.',
      'Jäger R, Kerksick CM, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.',
      'Morton RW, Murphy KT, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength. Br J Sports Med. 2018;52(6):376–384.',
    ],
  },
  {
    id: 'fluid-needs',
    name: 'Fluid Needs',
    category: 'Fluids',
    description: 'Adult 30–35 mL/kg estimate and Holliday-Segar for children.',
    component: FluidNeeds,
    about: [
      'For adults, 30–35 mL per kg per day is a widely used general clinical estimate (a rule of thumb rather than a single published equation) for healthy maintenance fluid needs. It needs adjusting for fever, losses, and conditions that require fluid restriction such as heart failure or kidney disease.',
      'For children, the Holliday-Segar method gives 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg for each kg above 20 kg.',
    ],
    references: [
      'Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823–832.',
    ],
  },
  {
    id: 'must-score',
    name: 'MUST Score',
    category: 'Screening',
    description: 'Malnutrition Universal Screening Tool (BAPEN).',
    component: MustScore,
    about: [
      "MUST is a five-step screening tool developed by BAPEN's Malnutrition Advisory Group to identify adults at risk of malnutrition. It scores BMI, unplanned weight loss over 3–6 months, and the effect of acute disease.",
      'The management guidance shown with each risk level follows the published tool in summary form. Always follow local policy, and use the full BAPEN materials for details such as alternative measurements when height or weight cannot be obtained.',
    ],
    references: [
      'Elia M (chair and editor). The "MUST" report. Nutritional screening of adults: a multidisciplinary responsibility. Redditch: BAPEN; 2003.',
      'BAPEN. The \'MUST\' Explanatory Booklet. bapen.org.uk',
    ],
  },
];
