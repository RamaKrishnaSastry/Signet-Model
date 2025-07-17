import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const VerificationResult = ({ result, isVisible }) => {
  if (!result || !isVisible) return null;

  const getStatusIcon = () => {
    if (result.is_genuine) {
      return <CheckCircle className="h-16 w-16 text-green-500" />;
    } else {
      return <XCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getStatusText = () => {
    return result.is_genuine ? 'Signatures Match' : 'Signatures Do Not Match';
  };

  const getStatusColor = () => {
    return result.is_genuine ? 'text-green-600' : 'text-red-600';
  };

  const getConfidenceColor = () => {
    const confidence = result.confidence * 100;
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`result-card ${isVisible ? 'show' : ''} bg-white rounded-xl p-8 card-shadow`}>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>
        
        <h3 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {getStatusText()}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Similarity Score</h4>
            <p className="text-2xl font-bold text-gray-900">
              {(result.similarity_score * 100).toFixed(1)}%
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Confidence</h4>
            <p className={`text-2xl font-bold ${getConfidenceColor()}`}>
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Threshold</h4>
            <p className="text-2xl font-bold text-gray-900">
              {(result.threshold * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-blue-800">Interpretation</span>
          </div>
          <p className="text-sm text-blue-700">
            {result.is_genuine 
              ? "The signatures appear to be from the same person with high confidence."
              : "The signatures show significant differences and may be from different people."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;
