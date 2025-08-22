import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SecurityData {
  score: number;
  ssl: boolean;
  headers: number;
  vulnerabilities: number;
}

interface SecuritySectionProps {
  data: SecurityData;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ data }) => {
  const securityChecks = [
    {
      name: 'SSL Certificate',
      status: data.ssl,
      description: data.ssl ? 'Valid SSL certificate found' : 'No valid SSL certificate'
    },
    {
      name: 'Security Headers',
      status: data.headers >= 8,
      description: `${data.headers}/10 security headers implemented`
    },
    {
      name: 'Vulnerabilities',
      status: data.vulnerabilities === 0,
      description: data.vulnerabilities === 0 ? 'No vulnerabilities detected' : `${data.vulnerabilities} vulnerabilities found`
    }
  ];

  return (
    <div className="audit-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Security Analysis</h2>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-blue-600">{data.score}</div>
          <div className="text-sm text-gray-600">Security Score</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityChecks.map((check, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <h3 className="font-semibold text-gray-800">{check.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{check.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-blue-800">Security Recommendations</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          {!data.ssl && <li>• Implement SSL/TLS encryption</li>}
          {data.headers < 8 && <li>• Add missing security headers (HSTS, CSP, X-Frame-Options)</li>}
          {data.vulnerabilities > 0 && <li>• Address identified vulnerabilities</li>}
          <li>• Regular security audits and monitoring</li>
          <li>• Keep software and dependencies updated</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySection;