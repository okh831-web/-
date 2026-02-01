
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CompetencyRadar, CompetencyBar } from '../components/Charts';
import { CORE_COMPETENCIES, SAMPLE_DATA } from '../constants';

const DeptDetail: React.FC = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();

  // Find dept in SAMPLE_DATA or calculate from state
  const deptData = useMemo(() => SAMPLE_DATA.find(d => d.dept === deptId), [deptId]);
  const univAvg = 82.5; // Mock univ avg

  if (!deptData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">해당 학과 데이터를 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/departments')} className="text-[#006633] font-bold underline">목록으로 돌아가기</button>
      </div>
    );
  }

  const radarLabels = CORE_COMPETENCIES;
  const radarData = CORE_COMPETENCIES.map((_, i) => deptData[`c${i+1}` as keyof typeof deptData] as number);
  const univRadarData = [80, 82, 85, 78, 83, 81]; // Mock

  // Analysis logic
  const deltas = radarLabels.map((label, i) => ({
    label,
    delta: radarData[i] - univRadarData[i]
  }));
  const sortedDeltas = [...deltas].sort((a, b) => b.delta - a.delta);
  
  const insights = [
    `대학 평균 대비 ${sortedDeltas[0].label} 역량이 가장 높게(Δ +${sortedDeltas[0].delta.toFixed(1)}) 나타났습니다.`,
    `두 번째 우수 역량은 ${sortedDeltas[1].label}으로, 학생들의 적극적인 활동이 관찰됩니다.`,
    `대학 평균 대비 가장 보완이 필요한 역량은 ${sortedDeltas[sortedDeltas.length-1].label}(Δ ${sortedDeltas[sortedDeltas.length-1].delta.toFixed(1)})입니다.`,
    `역량별 편차가 존재하므로, 균형 잡힌 성장을 위한 맞춤형 교육이 요구됩니다.`,
    `개선 제언: 1) ${sortedDeltas[sortedDeltas.length-1].label} 관련 비교과 프로그램 확대, 2) 우수 역량 사례 공유 세미나 개최.`
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <button onClick={() => navigate('/departments')} className="text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-2 text-sm font-medium">
          <i className="fas fa-arrow-left"></i> 학과 목록으로 돌아가기
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">{deptId}</h2>
            <p className="text-gray-500 font-medium">2026학년도 학과별 핵심역량 심층 분석 보고서</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold uppercase mb-1">학과 평균</p>
                <p className="text-2xl font-black text-[#006633]">{deptData.overall.toFixed(1)}</p>
             </div>
             <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">대학 평균 대비</p>
                <p className={`text-2xl font-black ${(deptData.overall - univAvg) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {(deptData.overall - univAvg) >= 0 ? '+' : ''}{(deptData.overall - univAvg).toFixed(1)}
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">학과 vs 대학 전체 (프로파일 비교)</h3>
          <CompetencyRadar 
            labels={radarLabels} 
            data={radarData} 
            label={deptId || '학과'} 
            compareData={univRadarData} 
            compareLabel="대학 전체 평균" 
          />
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">역량별 상세 격차 (Δ)</h3>
          <CompetencyBar 
            labels={radarLabels} 
            data={deltas.map(d => d.delta)} 
            label="대학 평균 대비 차이" 
          />
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-6 bg-[#006633] rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900">자동 요약 분석 인사이트</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex gap-4">
              <span className="text-[#006633] font-black text-lg opacity-30">{idx + 1}</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeptDetail;
