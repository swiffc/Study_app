import { useNavigate } from 'react-router-dom';
import { useWorkbookStore } from '../store/workbookStore';
import { BookOpen, Target, TrendingUp, Sparkles, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { workbooks } = useWorkbookStore();
  const navigate = useNavigate();

  const quickActions = [
    { icon: Calendar, label: 'Daily Focus', action: () => navigate('/daily-focus'), color: 'from-blue-500 to-cyan-500', featured: true },
    { icon: BookOpen, label: 'Unstoppable Mind', action: () => navigate('/workbook/example-unstoppable-mind'), color: 'from-primary-500 to-primary-600' },
    { icon: Sparkles, label: 'Manifestation', action: () => navigate('/manifestation'), color: 'from-purple-500 to-pink-500' },
    { icon: Target, label: 'Goals', action: () => navigate('/goals'), color: 'from-accent-500 to-yellow-500' },
    { icon: TrendingUp, label: 'Analytics', action: () => navigate('/analytics'), color: 'from-success-500 to-green-600' },
  ];

  return (
    <div className="p-8 pt-24 md:pt-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          Welcome to <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">ConsistentMind</span>
        </h1>
        <p className="text-lg text-gray-600">Your personal growth & manifestation platform</p>
      </div>

      {/* Featured Daily Focus */}
      <div 
        onClick={() => navigate('/daily-focus')}
        className="mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 group"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <Calendar size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })} - Your Daily Focus
              </h2>
              <p className="text-lg text-blue-100">
                Get your personalized plan for today. Affirmations, tasks, and focus areas tailored for each day of the week.
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-black mb-1">
              {new Date().getDate()}
            </div>
            <div className="text-sm opacity-90">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.filter(a => !a.featured).map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="group relative overflow-hidden rounded-2xl p-6 bg-white border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative">
                <div className={`bg-gradient-to-br ${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900">{action.label}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Workbooks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Workbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workbooks.slice(0, 6).map((workbook) => (
            <div
              key={workbook.id}
              onClick={() => navigate(`/workbook/${workbook.id}`)}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(workbook.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{workbook.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{workbook.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
        
        {workbooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No workbooks yet</h3>
            <p className="text-gray-500 mb-4">Start your journey by creating your first workbook</p>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[data-create-workbook]')?.click()}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Create Workbook
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
