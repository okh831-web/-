
import { CoreCompetency } from './types';

export const CORE_COMPETENCIES = [
  CoreCompetency.SELF_CONFIDENCE,
  CoreCompetency.LIFE_DESIGN,
  CoreCompetency.PROFESSIONALISM,
  CoreCompetency.CREATIVE_CHALLENGE,
  CoreCompetency.HARMONIOUS_COMMUNICATION,
  CoreCompetency.COMMUNITY_ENGAGEMENT
];

export const SUB_COMPETENCY_LABELS: Record<string, string[]> = {
  [CoreCompetency.SELF_CONFIDENCE]: ['자기이해', '자기조절'],
  [CoreCompetency.LIFE_DESIGN]: ['진로탐색', '생애설계'],
  [CoreCompetency.PROFESSIONALISM]: ['전공숙련', '직업윤리'],
  [CoreCompetency.CREATIVE_CHALLENGE]: ['비판적사고', '창의적문제해결'],
  [CoreCompetency.HARMONIOUS_COMMUNICATION]: ['대인관계', '의사소통'],
  [CoreCompetency.COMMUNITY_ENGAGEMENT]: ['글로벌시민의식', '나눔실천']
};

export const COLOR_PALETTE = {
  primary: '#006633', // Konyang Green
  secondary: '#FFC800', // Konyang Yellow
  accent: '#10b981',
  background: '#f8fafc',
  text: '#1e293b',
  danger: '#ef4444'
};

export const SAMPLE_DATA: any[] = [
  { dept: '간호학과', c1: 85, c2: 82, c3: 90, c4: 78, c5: 88, c6: 84, overall: 84.5 },
  { dept: '컴퓨터공학과', c1: 72, c2: 75, c3: 88, c4: 92, c5: 70, c6: 76, overall: 78.8 },
  { dept: '심리상담학과', c1: 80, c2: 88, c3: 75, c4: 70, c5: 95, c6: 90, overall: 83.0 },
  { dept: '임상병리학과', c1: 88, c2: 80, c3: 85, c4: 75, c5: 82, c6: 80, overall: 81.7 },
  { dept: '의예과', c1: 92, c2: 85, c3: 95, c4: 88, c5: 80, c6: 82, overall: 87.0 },
  { dept: '제약생명공학과', c1: 78, c2: 82, c3: 80, c4: 85, c5: 75, c6: 78, overall: 79.7 },
  { dept: '치위생학과', c1: 84, c2: 81, c3: 82, c4: 79, c5: 85, c6: 88, overall: 83.2 }
];
