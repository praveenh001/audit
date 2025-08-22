import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Zap, BarChart3, Globe, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    if (!validateUrl(formattedUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      const encodedUrl = encodeURIComponent(formattedUrl);
      navigate(`/audit/${encodedUrl}`);
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: 'Security Analysis',
      description: 'SSL certificates, security headers, and vulnerability scanning'
    },
    {
      icon: Zap,
      title: 'Performance Testing',
      description: 'Page load speed, optimization scores, and performance metrics'
    },
    {
      icon: BarChart3,
      title: 'SEO Audit',
      description: 'Meta tags, structured data, and search engine optimization'
    },
    {
      icon: CheckCircle,
      title: 'Accessibility Check',
      description: 'WCAG compliance and accessibility best practices'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <Globe className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold gradient-text">
              WebAudit Pro
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive website analysis tool for security, performance, SEO, and accessibility
          </p>
        </div>

        {/* URL Input Form */}
        <div className="audit-card rounded-2xl p-8 mb-16 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-lg font-semibold text-gray-700 mb-2">
                Enter Website URL to Audit
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Connecting to Lighthouse API...
                </div>
              ) : (
                'Start Lighthouse Audit'
              )}
            </button>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="audit-card rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="audit-card rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="pulse-animation mb-4">
                  <Shield className="w-16 h-16 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Running Lighthouse Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Google Lighthouse is analyzing your website's performance, accessibility, SEO, and best practices...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  This may take 30-60 seconds
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;