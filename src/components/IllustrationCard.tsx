import { Brain, Target, Lightbulb, Rocket, Heart, TrendingUp, Award, Star } from 'lucide-react';

interface Props {
  type: 'motivation' | 'insight' | 'achievement' | 'goal' | 'reflection' | 'growth' | 'reward' | 'inspiration';
  title: string;
  description: string;
}

const iconMap = {
  motivation: Rocket,
  insight: Lightbulb,
  achievement: Award,
  goal: Target,
  reflection: Brain,
  growth: TrendingUp,
  reward: Star,
  inspiration: Heart,
};

const colorMap = {
  motivation: 'from-primary-500 to-accent-500',
  insight: 'from-accent-500 to-yellow-500',
  achievement: 'from-success-500 to-green-600',
  goal: 'from-primary-600 to-purple-600',
  reflection: 'from-blue-500 to-cyan-500',
  growth: 'from-green-500 to-teal-500',
  reward: 'from-yellow-500 to-orange-500',
  inspiration: 'from-pink-500 to-red-500',
};

export const IllustrationCard: React.FC<Props> = ({ type, title, description }) => {
  const Icon = iconMap[type];
  const gradient = colorMap[type];

  return (
    <div className="my-8 group">
      <div className={`bg-gradient-to-br ${gradient} p-1 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105`}>
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className={`bg-gradient-to-br ${gradient} p-3 rounded-xl shadow-lg`}>
              <Icon className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
