
import React, { useState } from 'react';
import { auth, saveAggregatedData } from '../services/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const Admin: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      alert('로그인 실패: 정보를 확인하세요.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#006633]">관리자 로그인</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="관리자 이메일" 
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#006633]"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="비밀번호" 
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-[#006633]"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-[#006633] text-white font-bold rounded-xl">로그인</button>
          </form>
          <p className="mt-6 text-xs text-gray-400 text-center">건양대학교 핵심역량 시스템 관리자만 접속 가능합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">시스템 관리 콘솔</h2>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
          <i className="fas fa-sign-out-alt"></i> 로그아웃
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">진단 데이터 영구 반영</h3>
          <p className="text-sm text-gray-500 mb-6">브라우저에 임시 업로드된 분석 결과를 Firestore에 저장하여 모든 사용자에게 노출합니다.</p>
          <button 
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
            onClick={() => alert('현재 미리보기 상태의 데이터를 저장합니다 (데모용)')}
          >
            데이터 영구 저장하기
          </button>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">시스템 설정</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">최소 표본수 기준 (N)</span>
              <input type="number" defaultValue={10} className="w-20 p-2 border rounded text-center" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">진단 연도 표기</span>
              <span className="font-bold text-[#006633]">2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
