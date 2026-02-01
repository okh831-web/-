
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_DATA } from '../constants';

const DeptHub: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  // Example department list derived from mock
  const depts = SAMPLE_DATA.map(d => ({
    name: d.dept,
    avg: d.overall,
    sampleSize: Math.floor(Math.random() * 100) + 15
  }));

  const filtered = depts.filter(d => d.name.includes(search));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">학과별 결과 허브</h2>
        <div className="relative max-w-xl">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text"
            placeholder="학과명을 검색하세요..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#006633] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(dept => (
          <div 
            key={dept.name}
            onClick={() => navigate(`/departments/${dept.name}`)}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#006633] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-50 text-[#006633] w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                {dept.name.charAt(0)}
              </div>
              <span className="text-xs text-gray-400 font-medium">N={dept.sampleSize}</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#006633] transition-colors">{dept.name}</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-400 uppercase font-bold tracking-widest">평균</span>
              <span className="text-2xl font-black text-gray-900">{dept.avg.toFixed(1)}</span>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-xs text-blue-500 font-bold px-2 py-1 bg-blue-50 rounded">상세 분석 &rarr;</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <i className="fas fa-folder-open text-gray-300 text-5xl mb-4"></i>
            <p className="text-gray-400 font-medium">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeptHub;
