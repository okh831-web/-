
import { CompetencyData, AggregatedResult, CoreCompetency } from '../types';
import { CORE_COMPETENCIES } from '../constants';

export function calculateAggregations(data: CompetencyData[]): { universityAgg: AggregatedResult; deptAggs: AggregatedResult[] } {
  const depts = Array.from(new Set(data.map(d => d.dept)));
  
  const processGroup = (group: CompetencyData[], name: string): AggregatedResult => {
    const n = group.length;
    const scores: Record<string, number> = {};
    const stdDev: Record<string, number> = {};

    CORE_COMPETENCIES.forEach((comp, idx) => {
      const key = `c${idx + 1}` as keyof CompetencyData;
      const values = group.map(d => d[key] as number);
      const avg = values.reduce((a, b) => a + b, 0) / n;
      scores[comp] = avg;

      // Std Dev
      const sqDiffs = values.map(v => Math.pow(v - avg, 2));
      const variance = sqDiffs.reduce((a, b) => a + b, 0) / n;
      stdDev[comp] = Math.sqrt(variance);
    });

    const overallAvg = group.reduce((a, b) => a + b.overall, 0) / n;

    return {
      dept: name,
      avg: overallAvg,
      scores,
      sampleSize: n,
      stdDev
    };
  };

  const universityAgg = processGroup(data, '대학 전체');
  const deptAggs = depts.map(dept => processGroup(data.filter(d => d.dept === dept), dept));

  return { universityAgg, deptAggs };
}

export function validateMapping(headers: string[], mapping: Record<string, string>): { isValid: boolean; missing: string[] } {
  const required = ['dept', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  const missing = required.filter(r => !mapping[r] || !headers.includes(mapping[r]));
  return { isValid: missing.length === 0, missing };
}
