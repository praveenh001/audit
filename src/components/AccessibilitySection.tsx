import React from 'react';
import { Eye, AlertTriangle, CheckCircle, XCircle, Users } from 'lucide-react';

interface AccessibilityData {
  score: number;
  issues: number;
  compliance: string;
}

interface AccessibilitySectionProps {
  data: AccessibilityData;
}

const AccessibilitySection: React.FC<AccessibilitySectionProps> = ({ data }) => {
  const accessibilityChecks = [
    {
      name: 'Color Contrast',
      status: data.score >= 80,
      description: data.score >= 80 ? 'Sufficient color contrast ratios' : 'Some elements have low contrast',
      severity: 'high'
    },
    {
      name: 'Alt Text',
      status: data.issues < 3,
      description: data.issues < 3 ? 'Most images have alt text' : `${data.issues} images missing alt text`,
      severity: 'medium'
    },
    {
      name: 'Keyboard Navigation',
      status: data.score >= 70,
      description: data.score >= 70 ? 'Keyboard navigation supported' : 'Limited keyboard navigation',
      severity: 'high'
    },
    {
      name: 'ARIA Labels',
      status: data.issues < 5,
      description: data.issues < 5 ? 'Good ARIA implementation' : 'Missing ARIA labels detected',
      severity: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    return severity === 'high' ? 'text-red-600' : 'text-yellow-600';
  };

  const complianceLevel = data.compliance;
  const complianceColor = complianceLevel === 'AAA' ? 'text-green-600' : complianceLevel === 'AA' ? 'text-blue-600' : 'text-red-600';

  return (
    <div className="audit-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Eye className="w-6 h-6 text-orange-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Accessibility Analysis</h2>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-orange-600">{data.score}</div>
          <div className="text-sm text-gray-600">Accessibility Score</div>
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="mb-6 p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-orange-800 mb-1">WCAG Compliance Level</h3>
            <p className="text-sm text-orange-700">Web Content Accessibility Guidelines</p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${complianceColor}`}>
              {complianceLevel}
            </div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
        </div>
      </div>

      {/* Accessibility Checks */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {accessibilityChecks.map((check, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {check.status ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <h4 className="font-semibold text-gray-800">{check.name}</h4>
              </div>
              {!check.status && (
                <AlertTriangle className={`w-4 h-4 ${getSeverityColor(check.severity)}`} />
              )}
            </div>
            <p className="text-sm text-gray-600">{check.description}</p>
            {!check.status && (
              <div className={`text-xs uppercase font-medium mt-2 ${getSeverityColor(check.severity)}`}>
                {check.severity} priority
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Issues Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{Math.max(0, data.issues - 3)}</div>
          <div className="text-sm text-red-700">Critical Issues</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{Math.min(data.issues, 3)}</div>
          <div className="text-sm text-yellow-700">Moderate Issues</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{12 - data.issues}</div>
          <div className="text-sm text-green-700">Passed Checks</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Users className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="font-semibold text-orange-800">Accessibility Recommendations</h3>
        </div>
        <ul className="text-sm text-orange-700 space-y-1">
          {data.score < 80 && <li>• Improve color contrast ratios for better readability</li>}
          {data.issues >= 3 && <li>• Add alt text to all informative images</li>}
          {data.score < 70 && <li>• Ensure all interactive elements are keyboard accessible</li>}
          {data.issues >= 5 && <li>• Add ARIA labels to complex UI components</li>}
          <li>• Test with screen readers and assistive technologies</li>
          <li>• Provide skip navigation links</li>
          <li>• Ensure sufficient focus indicators</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibilitySection;