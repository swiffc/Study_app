import { TrendingUp } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-success-600 to-green-600 bg-clip-text text-transparent mb-2">
          Analytics & Insights
        </h1>
        <p className="text-lg text-gray-600">Understand your patterns and progress</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
        <TrendingUp className="mx-auto text-success-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Feature Coming Soon!</h2>
        <p className="text-gray-600">
          Detailed insights into your habits, streaks, completion rates, and growth patterns
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
