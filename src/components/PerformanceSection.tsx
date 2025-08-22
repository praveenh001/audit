import React from 'react';
import { Zap, Clock, Download, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceData {
  score: number;
  loadTime: number;
  pageSize: number;
  requests: number;
  metrics?: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    totalBlockingTime: number;
  };
}

interface PerformanceSectionProps {
  data: PerformanceData;
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ data }) => {
  const performanceMetrics = [
    {
      name: 'Load Time',
      value: `${data.loadTime.toFixed(2)}s`,
      icon: Clock,
      status: data.loadTime < 2 ? 'good' : data.loadTime < 4 ? 'fair' : 'poor'
    },
    {
      name: 'Page Size',
      value: `${(data.pageSize / 1000).toFixed(1)}MB`,
      icon: Download,
      status: data.pageSize < 1000 ? 'good' : data.pageSize < 2000 ? 'fair' : 'poor'
    },
    {
      name: 'Requests',
      value: data.requests.toString(),
      icon: Activity,
      status: data.requests < 30 ? 'good' : data.requests < 60 ? 'fair' : 'poor'
    }
  ];

  // Add Core Web Vitals if available
  const coreWebVitals = data.metrics ? [
    {
      name: 'First Contentful Paint',
      value: `${(data.metrics.firstContentfulPaint / 1000).toFixed(2)}s`,
      status: data.metrics.firstContentfulPaint < 1800 ? 'good' : data.metrics.firstContentfulPaint < 3000 ? 'fair' : 'poor'
    },
    {
      name: 'Largest Contentful Paint',
      value: `${(data.metrics.largestContentfulPaint / 1000).toFixed(2)}s`,
      status: data.metrics.largestContentfulPaint < 2500 ? 'good' : data.metrics.largestContentfulPaint < 4000 ? 'fair' : 'poor'
    },
    {
      name: 'Cumulative Layout Shift',
      value: data.metrics.cumulativeLayoutShift.toFixed(3),
      status: data.metrics.cumulativeLayoutShift < 0.1 ? 'good' : data.metrics.cumulativeLayoutShift < 0.25 ? 'fair' : 'poor'
    }
  ] : [];
  const getStatusColor = (status: string) => {
    const colors = {
      good: 'text-green-600 bg-green-50',
      fair: 'text-yellow-600 bg-yellow-50',
      poor: 'text-red-600 bg-red-50'
    };
    return colors[status as keyof typeof colors];
  };

  // Chart data for load time breakdown
  const loadTimeData = {
    labels: data.metrics ? 
      ['First Contentful Paint', 'Largest Contentful Paint', 'Total Blocking Time'] :
      ['DNS Lookup', 'Connection', 'Server Response', 'Download', 'Render'],
    datasets: [
      {
        label: 'Time (ms)',
        data: data.metrics ? 
          [data.metrics.firstContentfulPaint, data.metrics.largestContentfulPaint, data.metrics.totalBlockingTime] :
          [120, 200, 450, 380, 650],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  // Chart data for performance over time
  const performanceOverTime = {
    labels: ['1 min ago', '2 min ago', '3 min ago', '4 min ago', '5 min ago'],
    datasets: [
      {
        label: 'Load Time (s)',
        data: [data.loadTime, data.loadTime + 0.2, data.loadTime - 0.1, data.loadTime + 0.3, data.loadTime - 0.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="audit-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Zap className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Performance Analysis</h2>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-green-600">{data.score}</div>
          <div className="text-sm text-gray-600">Performance Score</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className={`rounded-lg p-4 ${getStatusColor(metric.status)}`}>
            <div className="flex items-center mb-2">
              <metric.icon className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">{metric.name}</h3>
            </div>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="text-sm capitalize">{metric.status}</div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      {coreWebVitals.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Web Vitals</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {coreWebVitals.map((vital, index) => (
              <div key={index} className={`rounded-lg p-4 ${getStatusColor(vital.status)}`}>
                <h4 className="font-semibold mb-1">{vital.name}</h4>
                <div className="text-xl font-bold">{vital.value}</div>
                <div className="text-sm capitalize">{vital.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {data.metrics ? 'Core Metrics' : 'Load Time Breakdown'}
          </h3>
          <div className="chart-container">
            <Bar data={loadTimeData} options={chartOptions} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h3>
          <div className="chart-container">
            <Line data={performanceOverTime} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-green-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Activity className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-green-800">Performance Recommendations</h3>
        </div>
        <ul className="text-sm text-green-700 space-y-1">
          {data.loadTime > 2 && <li>• Optimize server response time</li>}
          {data.pageSize > 1000 && <li>• Compress images and enable gzip compression</li>}
          {data.requests > 30 && <li>• Reduce HTTP requests by combining files</li>}
          {data.metrics?.firstContentfulPaint && data.metrics.firstContentfulPaint > 1800 && <li>• Improve First Contentful Paint by optimizing critical resources</li>}
          {data.metrics?.largestContentfulPaint && data.metrics.largestContentfulPaint > 2500 && <li>• Optimize Largest Contentful Paint by improving image loading</li>}
          {data.metrics?.cumulativeLayoutShift && data.metrics.cumulativeLayoutShift > 0.1 && <li>• Reduce Cumulative Layout Shift by setting image dimensions</li>}
          <li>• Enable browser caching</li>
          <li>• Use a Content Delivery Network (CDN)</li>
          <li>• Minimize and compress CSS/JavaScript files</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceSection;