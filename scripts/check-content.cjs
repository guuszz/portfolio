const fs = require('node:fs');
const home = fs.readFileSync('app/page.tsx', 'utf8');
const about = fs.readFileSync('components/about-bento.tsx', 'utf8');
const layout = fs.readFileSync('app/layout.tsx', 'utf8');
const now = fs.readFileSync('app/now/page.tsx', 'utf8');
const checks = {
  firstOpportunity: home.includes('primeira oportunidade'),
  appsec: home.includes('AppSec'),
  threeEvidenceProjects: ['OFICINA', 'api-attack-surface', 'scopeguard'].every(x => home.includes(x)),
  noUnverifiedEmployment: !layout.includes('Frontend Developer Intern'),
  noHardcodedActivityCounters: !about.includes('<Stat '),
  pendingReviewsExplicit: now.includes('não foram incorporadas'),
};
console.log(JSON.stringify(checks, null, 2));
process.exit(Object.values(checks).every(Boolean) ? 0 : 1);
