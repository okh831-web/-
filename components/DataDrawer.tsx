
import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { calculateAggregations } from '../services/dataProcessor';
import { CompetencyData } from '../types';

interface DataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: { universityAgg: any; deptAggs: any[]; count: number }) => void;
  isAdmin: boolean;
}

const DataDrawer: React.FC<DataDrawerProps> = ({ isOpen, onClose, onApply, isAdmin }) => {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({
    dept: '', c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', overall: ''
  });
  const [rawData, setRawData] = useState<any[]>([]);
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];
        if (data.length > 0) {
          setHeaders(data[0]);
          setRawData(XLSX.utils.sheet_to_json(ws));
          setStep(2);
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleApply = () => {
    const formattedData: CompetencyData[] = rawData.map(row => ({
      dept: row[mapping.dept],
      c1: Number(row[mapping.c1]),
      c2: Number(row[mapping.c2]),
      c3: Number(row[mapping.c3]),
      c4: Number(row[mapping.c4]),
      c5: Number(row[mapping.c5]),
      c6: Number(row[mapping.c6]),
      overall: row[mapping.overall] ? Number(row[mapping.overall]) : (
        (Number(row[mapping.c1]) + Number(row[mapping.c2]) + Number(row[mapping.c3]) + 
         Number(row[mapping.c4]) + Number(row[mapping.c5]) + Number(row[mapping.c6])) / 6
      )
    }));

    const result = calculateAggregations(formattedData);
    onApply({ ...result, count: formattedData.length });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">데이터 업로드 및 관리</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#006633] transition-colors cursor-pointer relative">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
              <i className="fas fa-file-excel text-4xl text-gray-400 mb-4"></i>
              <p className="font-medium text-gray-600">엑셀 파일을 드래그하거나 클릭하여 선택하세요</p>
              <p className="text-xs text-gray-400 mt-2">.xlsx, .xls, .csv 파일 지원</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <i className="fas fa-info-circle mt-0.5"></i>
                <span>업로드된 파일은 서버로 직접 전송되지 않고 브라우저 메모리에서 안전하게 처리됩니다.</span>
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">컬럼 매핑 설정</h3>
            <div className="space-y-3">
              {[
                { label: '학과명(필수)', key: 'dept' },
                { label: '자기신뢰(c1)', key: 'c1' },
                { label: '라이프디자인(c2)', key: 'c2' },
                { label: '프로페셔널리즘(c3)', key: 'c3' },
                { label: '창조적 도전(c4)', key: 'c4' },
                { label: '융화적 소통(c5)', key: 'c5' },
                { label: '공동체참여(c6)', key: 'c6' },
                { label: '전체 평균(선택)', key: 'overall' }
              ].map(item => (
                <div key={item.key} className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 ml-1">{item.label}</label>
                  <select 
                    value={mapping[item.key]} 
                    onChange={(e) => setMapping(prev => ({ ...prev, [item.key]: e.target.value }))}
                    className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#006633] outline-none"
                  >
                    <option value="">컬럼 선택</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t mt-6 flex flex-col gap-3">
              <button 
                onClick={handleApply}
                className="w-full py-3 bg-[#006633] text-white rounded-xl font-bold hover:bg-[#00552b] transition-all"
              >
                미리보기 적용
              </button>
              {isAdmin && (
                <p className="text-xs text-center text-gray-400">관리자로 로그인 중입니다. 영구 저장은 관리자 페이지에서 가능합니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDrawer;
