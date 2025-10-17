import { useNavigate } from 'react-router-dom';
import { useWorkbookStore } from '../store/workbookStore';
import { BookOpen, Target, TrendingUp, Sparkles, Calendar, Zap, Brain, Heart, Star, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { workbooks } = useWorkbookStore();
  const navigate = useNavigate();

  const quickActions = [
    { icon: Calendar, label: 'Daily Focus', action: () => navigate('/daily-focus'), color: 'from-primary-500 to-primary-700', description: 'Your personalized daily plan', featured: true },
    { icon: Brain, label: 'Workbooks', action: () => navigate('/workbook/example-unstoppable-mind'), color: 'from-accent-500 to-accent-700', description: 'Interactive study guides' },
    { icon: Sparkles, label: 'Manifestation', action: () => navigate('/manifestation'), color: 'from-purple-500 to-pink-600', description: 'Create your reality' },
    { icon: Target, label: 'Goals', action: () => navigate('/goals'), color: 'from-gold-500 to-orange-600', description: 'Track your progress' },
    { icon: TrendingUp, label: 'Analytics', action: () => navigate('/analytics'), color: 'from-success-500 to-green-700', description: 'View insights' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section with Pattern Background */}
      <div className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168, 85, 247) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-8 pt-32 pb-20">
          <div className="text-center space-y-6 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-accent-200">
              <Star className="text-gold-500" size={16} />
              <span className="text-sm font-semibold text-gray-700">Your Journey to Excellence Starts Here</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-200">
                ConsistentMind
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Transform your life with interactive workbooks, daily focus systems, and powerful manifestation tools
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => navigate('/daily-focus')}
                className="group flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-glow-blue transition-all duration-300 transform hover:scale-105"
              >
                <Zap size={24} />
                Start Your Day
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/manifestation')}
                className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-accent-300 transition-all duration-300"
              >
                <Heart size={24} className="text-accent-500" />
                Explore Features
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center pt-8 text-gray-700">
              <div className="text-center">
                <div className="text-3xl font-black text-primary-600">7+</div>
                <div className="text-sm font-medium">Expert Workbooks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent-600">{workbooks.length}</div>
                <div className="text-sm font-medium">Your Workbooks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-success-600">∞</div>
                <div className="text-sm font-medium">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 cursor-pointer border-2 border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <action.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                  {action.label}
                </h3>
                
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 mb-4">
                  {action.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-white transition-colors duration-300">
                  <span>Explore</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workbooks */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Your Workbooks</h2>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
          <button
            onClick={() => document.querySelector<HTMLButtonElement>('[data-create-workbook]')?.click()}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <BookOpen size={20} />
            New Workbook
          </button>
        </div>

        {workbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workbooks.slice(0, 6).map((workbook, index) => (
              <div
                key={workbook.id}
                onClick={() => navigate(`/workbook/${workbook.id}`)}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-200 hover:border-primary-300 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <BookOpen className="text-primary-600" size={24} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(workbook.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-black text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {workbook.name}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {workbook.content.substring(0, 120)}...
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:gap-3 transition-all">
                  <span>Continue Reading</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-primary-600" size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No workbooks yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start your journey by creating your first workbook or explore our expert-curated examples
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-create-workbook]')?.click()}
                className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BookOpen size={20} />
                Create Workbook
              </button>
              <button
                onClick={() => navigate('/workbook/example-manifestation')}
                className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Sparkles size={20} className="text-accent-500" />
                Browse Examples
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
