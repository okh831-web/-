
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLOR_PALETTE } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <div className="bg-[#006633] text-white p-2 rounded mr-3">
                  <i className="fas fa-university text-xl"></i>
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-none" style={{ color: COLOR_PALETTE.primary }}>건양대학교</h1>
                  <p className="text-xs text-gray-500 font-medium tracking-tight">핵심역량 진단 포털 (2026)</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-[#006633]' : 'text-gray-500 hover:text-gray-900'}`}>대학 전체 결과</Link>
              <Link to="/departments" className={`text-sm font-semibold transition-colors ${isActive('/departments') ? 'text-[#006633]' : 'text-gray-500 hover:text-gray-900'}`}>학과별 허브</Link>
              <Link to="/community" className={`text-sm font-semibold transition-colors ${isActive('/community') ? 'text-[#006633]' : 'text-gray-500 hover:text-gray-900'}`}>커뮤니티</Link>
              <Link to="/admin" className={`text-sm font-semibold transition-colors ${isActive('/admin') ? 'text-[#006633]' : 'text-gray-500 hover:text-gray-900'}`}>관리자</Link>
            </nav>
            <div className="md:hidden">
              <i className="fas fa-bars text-gray-500 text-xl cursor-pointer"></i>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-100 border-t py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-gray-600 font-medium">건양대학교 교육성과관리센터</p>
            <p className="text-xs text-gray-400 mt-1">© 2026 Konyang University. All rights reserved.</p>
          </div>
          <div className="text-xs text-gray-500 flex flex-col items-center sm:items-end gap-1">
            <p>데이터 기준: 2026학년도 정기진단 (N=1,245)</p>
            <p>문의: okh831@gmail.com | 041-730-XXXX</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
