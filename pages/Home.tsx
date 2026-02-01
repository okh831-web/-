
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CORE_COMPETENCIES, SUB_COMPETENCY_LABELS, COLOR_PALETTE } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <img src="https://picsum.photos/seed/konyang/1920/1080" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt="Campus" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl font-black mb-6 tracking-tight drop-shadow-lg">건양대학교 핵심역량 진단(2026)</h2>
          <p className="text-xl font-light mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
            나를 알고 세상을 디자인하는 힘, 건양의 6대 핵심역량.<br/>
            지표를 통해 학생들의 성장을 확인하고 교육의 방향을 설계합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-[#006633] hover:bg-[#00552b] rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              대학 전체 결과 보기
            </button>
            <button 
              onClick={() => navigate('/departments')}
              className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              학과별 결과 보기
            </button>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-[#006633]">
            <i className="fas fa-calendar-check text-[#006633] text-3xl mb-4"></i>
            <h4 className="font-bold text-lg mb-2">진단 기간</h4>
            <p className="text-sm text-gray-600">2026.03.02 ~ 2026.04.15</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-[#006633]">
            <i className="fas fa-users text-[#006633] text-3xl mb-4"></i>
            <h4 className="font-bold text-lg mb-2">참여 인원</h4>
            <p className="text-sm text-gray-600">총 1,245명 (재학생 전체 대상)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-[#006633]">
            <i className="fas fa-chart-pie text-[#006633] text-3xl mb-4"></i>
            <h4 className="font-bold text-lg mb-2">진단 단위</h4>
            <p className="text-sm text-gray-600">0~100점 (역량 지수화)</p>
          </div>
        </div>

        {/* Competencies Introduction */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">6대 핵심역량 및 12 하위역량</h3>
            <div className="w-16 h-1 bg-[#006633] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_COMPETENCIES.map((comp) => (
              <div key={comp} className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#006633] hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-[#006633] rounded-2xl flex items-center justify-center font-black group-hover:bg-[#006633] group-hover:text-white transition-colors">
                    {comp.charAt(0)}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{comp}</h4>
                </div>
                <div className="space-y-3">
                  {SUB_COMPETENCY_LABELS[comp].map(sub => (
                    <div key={sub} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      {sub}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-400 leading-relaxed">
                  건양대학교 학생으로서 갖추어야 할 필수적인 소양으로, 진단 도구를 통해 주기적으로 측정 관리됩니다.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
