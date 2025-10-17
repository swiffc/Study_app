import { TrendingUp, Calendar, CheckCircle, Target } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';

export const StatsCard: React.FC = () => {
  const { currentWorkbook, checkboxes } = useWorkbookStore();

  if (!currentWorkbook) return null;

  const checkboxArray = Array.from(checkboxes.values());
  const totalTasks = checkboxArray.length;
  const completedTasks = checkboxArray.filter(cb => cb.checked).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { icon: Calendar, label: 'Days Active', value: '1', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle, label: 'Completed', value: completedTasks.toString(), color: 'from-success-500 to-green-600' },
    { icon: Target, label: 'Total Goals', value: totalTasks.toString(), color: 'from-primary-500 to-accent-500' },
    { icon: TrendingUp, label: 'Progress', value: `${completionRate}%`, color: 'from-accent-500 to-yellow-500' },
  ];

  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
        >
          <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon className="text-white" size={24} />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
