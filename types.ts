
export enum CoreCompetency {
  SELF_CONFIDENCE = '자기신뢰',
  LIFE_DESIGN = '라이프디자인',
  PROFESSIONALISM = '프로페셔널리즘',
  CREATIVE_CHALLENGE = '창조적 도전',
  HARMONIOUS_COMMUNICATION = '융화적 소통',
  COMMUNITY_ENGAGEMENT = '공동체참여'
}

export interface CompetencyData {
  dept: string;
  c1: number; // 자기신뢰
  c2: number; // 라이프디자인
  c3: number; // 프로페셔널리즘
  c4: number; // 창조적 도전
  c5: number; // 융화적 소통
  c6: number; // 공동체참여
  s1?: number; // 하위역량 12개 (옵션)
  s2?: number;
  s3?: number;
  s4?: number;
  s5?: number;
  s6?: number;
  s7?: number;
  s8?: number;
  s9?: number;
  s10?: number;
  s11?: number;
  s12?: number;
  overall: number;
}

export interface AggregatedResult {
  dept: string;
  avg: number;
  scores: Record<string, number>;
  sampleSize: number;
  stdDev: Record<string, number>;
}

export interface AppState {
  data: CompetencyData[];
  universityAgg: AggregatedResult | null;
  deptAggs: AggregatedResult[];
  lastUpdated: string | null;
  isPreviewMode: boolean;
  isAdmin: boolean;
}

export interface Inquiry {
  id?: string;
  name: string;
  contact: string;
  content: string;
  timestamp: string;
  refNumber: string;
}
