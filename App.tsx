
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DeptHub from './pages/DeptHub';
import DeptDetail from './pages/DeptDetail';
import Community from './pages/Community';
import Admin from './pages/Admin';

// Error Boundary Fallback
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
      <div className="text-red-500 text-5xl mb-6">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">예기치 못한 오류가 발생했습니다</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">사이트 이용 중 문제가 발생했습니다. 관리자에게 문의하거나 페이지를 새로고침 해주세요.</p>
      <button 
        onClick={() => window.location.reload()}
        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
      >
        페이지 새로고침
      </button>
      <p className="mt-4 text-xs text-gray-300">Error: {error.message}</p>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/departments" element={<DeptHub />} />
            <Route path="/departments/:deptId" element={<DeptDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
