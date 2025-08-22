import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon: Icon, color }) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 text-blue-600',
      green: 'from-green-500 to-green-600 text-green-600',
      purple: 'from-purple-500 to-purple-600 text-purple-600',
      orange: 'from-orange-500 to-orange-600 text-orange-600',
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="audit-card rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Icon className={`w-6 h-6 ${getColorClasses(color).split(' ')[2]}`} />
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className={`text-sm font-medium ${getScoreColor(score)}`}>
          {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Fair' : 'Poor'}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;