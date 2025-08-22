import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Search, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Download
} from 'lucide-react';
import { lighthouseApi, LighthouseResult } from '../services/lighthouseApi';
import SecuritySection from './SecuritySection';
import PerformanceSection from './PerformanceSection';
import SEOSection from './SEOSection';
import AccessibilitySection from './AccessibilitySection';
import ScoreCard from './ScoreCard';

const AuditResults = () => {
  const { url } = useParams<{ url: string }>();
  const navigate = useNavigate();
  const [auditData, setAuditData] = useState<LighthouseResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const performAudit = async () => {
      try {
        setLoading(true);
        setError(null);
      const decodedUrl = decodeURIComponent(url);
        
        const result = await lighthouseApi.auditWebsite(decodedUrl);
        setAuditData(result);
      } catch (err) {
        console.error('Audit failed:', err);
        setError('Failed to audit website. Please check the URL and try again.');
      } finally {
      setLoading(false);
      }
    };

    performAudit();
  }, [url]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="audit-card rounded-2xl p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Running Lighthouse Audit
            </h3>
            <p className="text-gray-600">
              Analyzing performance, security, SEO, and accessibility...
            </p>
            <div className="mt-4 text-sm text-gray-500">
              This may take 30-60 seconds
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Audit Failed</h2>
          <p className="text-gray-600 mb-4">
            {error || 'Unable to audit the specified website.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="audit-card rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Lighthouse Audit Results
                </h1>
                <p className="text-gray-600 mb-2">
                  {auditData.url}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(auditData.timestamp).toLocaleString()}
                </div>
                <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  Powered by Google Lighthouse
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(auditData.overallScore)} mb-1`}>
                    {auditData.overallScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    Overall Score
                  </div>
                  <div className={`text-sm font-semibold ${getScoreColor(auditData.overallScore)}`}>
                    {getScoreStatus(auditData.overallScore)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScoreCard
            title="Security"
            score={auditData.security.score}
            icon={Shield}
            color="blue"
          />
          <ScoreCard
            title="Performance"
            score={auditData.performance.score}
            icon={Zap}
            color="green"
          />
          <ScoreCard
            title="SEO"
            score={auditData.seo.score}
            icon={Search}
            color="purple"
          />
          <ScoreCard
            title="Accessibility"
            score={auditData.accessibility.score}
            icon={Eye}
            color="orange"
          />
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <SecuritySection data={auditData.security} />
          <PerformanceSection data={auditData.performance} />
          <SEOSection data={auditData.seo} />
          <AccessibilitySection data={auditData.accessibility} />
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;