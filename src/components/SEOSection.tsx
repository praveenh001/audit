import React from 'react';
import { Search, Tag, FileText, Sigma as Sitemap, CheckCircle, XCircle } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SEOData {
  score: number;
  metaTags: number;
  headings: boolean;
  sitemap: boolean;
}

interface SEOSectionProps {
  data: SEOData;
}

const SEOSection: React.FC<SEOSectionProps> = ({ data }) => {
  const seoChecks = [
    {
      name: 'Meta Tags',
      status: data.metaTags >= 8,
      description: `${data.metaTags}/12 essential meta tags found`,
      icon: Tag
    },
    {
      name: 'Heading Structure',
      status: data.headings,
      description: data.headings ? 'Proper heading hierarchy (H1-H6)' : 'Heading structure needs improvement',
      icon: FileText
    },
    {
      name: 'XML Sitemap',
      status: data.sitemap,
      description: data.sitemap ? 'XML sitemap found and accessible' : 'No XML sitemap detected',
      icon: Sitemap
    }
  ];

  // Chart data for SEO score breakdown
  const seoBreakdown = {
    labels: ['Content', 'Technical', 'Meta Tags', 'Links', 'Performance'],
    datasets: [
      {
        data: [85, 78, 92, 71, data.score],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="audit-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Search className="w-6 h-6 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">SEO Analysis</h2>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-purple-600">{data.score}</div>
          <div className="text-sm text-gray-600">SEO Score</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* SEO Checks */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Checklist</h3>
          <div className="space-y-4">
            {seoChecks.map((check, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  {check.status ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <check.icon className="w-5 h-5 text-gray-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">{check.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{check.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Score Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Score Breakdown</h3>
          <div className="chart-container">
            <Doughnut data={seoBreakdown} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Search className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-semibold text-purple-800">SEO Recommendations</h3>
        </div>
        <ul className="text-sm text-purple-700 space-y-1">
          {data.metaTags < 8 && <li>• Add missing meta tags (description, keywords, og tags)</li>}
          {!data.headings && <li>• Improve heading structure with proper H1-H6 hierarchy</li>}
          {!data.sitemap && <li>• Create and submit an XML sitemap</li>}
          <li>• Optimize page titles and meta descriptions</li>
          <li>• Add alt text to all images</li>
          <li>• Improve internal linking structure</li>
          <li>• Ensure mobile responsiveness</li>
        </ul>
      </div>
    </div>
  );
};

export default SEOSection;