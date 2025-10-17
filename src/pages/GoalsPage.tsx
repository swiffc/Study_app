import { Target } from 'lucide-react';

const GoalsPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-accent-600 to-yellow-600 bg-clip-text text-transparent mb-2">
          Goals & Tracking
        </h1>
        <p className="text-lg text-gray-600">Track your progress toward your dreams</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
        <Target className="mx-auto text-accent-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Goals Feature Coming Soon!</h2>
        <p className="text-gray-600">
          Advanced goal tracking with milestones, deadlines, and progress visualization
        </p>
      </div>
    </div>
  );
};

export default GoalsPage;
