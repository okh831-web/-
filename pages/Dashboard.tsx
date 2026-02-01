
import React, { useState } from 'react';
import { CompetencyRadar, CompetencyBar } from '../components/Charts';
import DataDrawer from '../components/DataDrawer';
import { CORE_COMPETENCIES, SAMPLE_DATA, COLOR_PALETTE } from '../constants';
import { calculateAggregations } from '../services/dataProcessor';

const Dashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => {
    // Initial mock data based on SAMPLE_DATA
    const formatted = SAMPLE_DATA.map(d => ({ ...d, overall: d.overall || 80 }));
    return { ...calculateAggregations(formatted), count: 1245 };
  });

  const handleApplyData = (newData: any) => {
    setAnalytics(newData);
  };

  const radarLabels = CORE_COMPETENCIES;
  const radarData = CORE_COMPETENCIES.map(comp => analytics.universityAgg?.scores[comp] || 0);

  // Sorting to find top/bottom
  const sortedScores = Object.entries(analytics.universityAgg?.scores || {})
    .sort(([, a], [, b]) => b - a);
  const topComp = sortedScores[0];
  const bottomComp = sortedScores[sortedScores.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex text-sm text-gray-400 mb-2 gap-2">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-gray-600 font-medium">대학 전체 결과</span>
          </nav>
          <h2 className="text-3xl font-bold text-gray-900">대학 전체 진단 대시보드 (2026)</h2>
        </div>
        <button 
          onClick={() => setDrawerOpen(true)}
          className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg"
        >
          <i className="fas fa-database"></i> 전체 데이터 입력
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">전체 평균</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#006633]">{analytics.universityAgg?.avg.toFixed(1)}</span>
            <span className="text-gray-400 text-sm font-medium">/ 100</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">최상위 역량</p>
          <p className="text-xl font-bold text-gray-800 truncate">{topComp?.[0] || '-'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">최하위 역량</p>
          <p className="text-xl font-bold text-gray-800 truncate">{bottomComp?.[0] || '-'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">총 표본수 (N)</p>
          <p className="text-3xl font-black text-gray-800">{analytics.count.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">6대 역량 프로파일 (레이더)</h3>
            <span className="px-3 py-1 bg-emerald-50 text-[#006633] text-xs font-bold rounded-full">대학 전체</span>
          </div>
          <CompetencyRadar labels={radarLabels} data={radarData} label="대학 평균" />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">역량별 지수 비교 (막대)</h3>
            <span className="px-3 py-1 bg-emerald-50 text-[#006633] text-xs font-bold rounded-full">Score</span>
          </div>
          <CompetencyBar labels={radarLabels} data={radarData} label="점수" />
        </div>
      </div>

      {/* Detail Table */}
      <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">역량 지수 상세 데이터</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">핵심역량</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">평균 점수</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">표준 편차</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">분포</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CORE_COMPETENCIES.map(comp => (
                <tr key={comp} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-700">{comp}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{(analytics.universityAgg?.scores[comp] || 0).toFixed(1)}</td>
                  <td className="px-6 py-4 text-gray-500">{(analytics.universityAgg?.stdDev[comp] || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden max-w-[150px]">
                      <div className="bg-[#006633] h-full" style={{ width: `${analytics.universityAgg?.scores[comp]}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DataDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        onApply={handleApplyData}
        isAdmin={false} 
      />
    </div>
  );
};

export default Dashboard;
