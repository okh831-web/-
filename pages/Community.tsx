
import React, { useState } from 'react';
import { submitInquiry } from '../services/firebase';

const Community: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', content: '' });
  const [submitted, setSubmitted] = useState(false);
  const [refNum, setRefNum] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const timestamp = new Date().toLocaleString();
    
    await submitInquiry({ ...formData, refNumber: newRef });
    
    setRefNum(newRef);
    setSubmitted(true);

    // Prepare mailto link
    const subject = encodeURIComponent(`[건양대 핵심역량 2026] 문의: ${formData.name}`);
    const body = encodeURIComponent(`
접수번호: ${newRef}
접수시간: ${timestamp}
문의자: ${formData.name}
연락처: ${formData.contact}
페이지 URL: ${window.location.href}

문의내용:
${formData.content}
    `);
    
    // Auto trigger mailto if needed, but the prompt says provide a link too
    // window.location.href = `mailto:okh831@gmail.com?subject=${subject}&body=${body}`;
  };

  const mailtoLink = `mailto:okh831@gmail.com?subject=${encodeURIComponent(`[건양대 핵심역량 2026] 문의: ${formData.name}`)}&body=${encodeURIComponent(`접수번호: ${refNum}\n문의내용: ${formData.content}`)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티 및 문의</h2>
        <p className="text-gray-500 mb-10">시스템 오류나 데이터 관련 문의사항을 남겨주시면 성실히 답변해 드리겠습니다.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">성함 / 부서</label>
              <input 
                type="text" 
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#006633] outline-none"
                placeholder="홍길동 (간호학과)"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">연락처 / 이메일</label>
              <input 
                type="text" 
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#006633] outline-none"
                placeholder="010-0000-0000"
                value={formData.contact}
                onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
              <textarea 
                rows={5}
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#006633] outline-none"
                placeholder="문의하실 내용을 상세히 적어주세요."
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#006633] text-white font-bold rounded-xl hover:bg-[#00552b] transition-all shadow-lg"
            >
              문의하기 제출
            </button>
          </form>
        ) : (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-emerald-100 text-center animate-fade-in">
            <div className="w-20 h-20 bg-emerald-50 text-[#006633] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fas fa-check"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">문의가 접수되었습니다.</h3>
            <p className="text-gray-500 mb-6">접수번호: <span className="font-bold text-gray-900">{refNum}</span></p>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">관리자 확인 후 기재하신 연락처로 답변 드립니다.</p>
              <a 
                href={mailtoLink}
                className="inline-block px-8 py-3 border-2 border-[#006633] text-[#006633] font-bold rounded-xl hover:bg-emerald-50 transition-all"
              >
                관리자에게 메일 직접 발송
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
