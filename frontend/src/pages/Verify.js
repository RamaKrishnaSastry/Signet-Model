import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import SignatureUpload from '../components/SignatureUpload';
import VerificationResult from '../components/VerificationResult';
import LoadingSpinner from '../components/LoadingSpinner';
import { verifySignatures } from '../services/api';

const Verify = () => {
  const [signature1, setSignature1] = useState('');
  const [signature2, setSignature2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async () => {
    if (!signature1 || !signature2) {
      toast.error('Please upload both signatures to proceed');
      return;
    }

    setIsLoading(true);
    setShowResult(false);

    try {
      const response = await verifySignatures(signature1, signature2);
      
      if (response.success) {
        setResult(response);
        setShowResult(true);
        toast.success('Verification completed successfully!');
      } else {
        toast.error(response.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify signatures. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSignature1('');
    setSignature2('');
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Signature Verification
        </h1>
        <p className="text-xl text-white/80">
          Upload two signatures to verify their authenticity using our AI-powered system
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SignatureUpload
            label="Reference Signature"
            image={signature1}
            onImageUpload={setSignature1}
            onClear={() => setSignature1('')}
          />
          
          <SignatureUpload
            label="Signature to Verify"
            image={signature2}
            onImageUpload={setSignature2}
            onClear={() => setSignature2('')}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleVerify}
            disabled={isLoading || !signature1 || !signature2}
            className={`btn-primary text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
              isLoading || !signature1 || !signature2
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify Signatures'}
          </button>
          
          <button
            onClick={handleReset}
            className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
          <LoadingSpinner message="Analyzing signatures..." />
        </div>
      )}

      {result && (
        <VerificationResult result={result} isVisible={showResult} />
      )}

      {/* Information Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow">
        <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
          <div>
            <h4 className="font-semibold text-white mb-2">Siamese Neural Network</h4>
            <p className="text-sm">
              Our system uses a Siamese Neural Network architecture that compares two signatures 
              by learning to measure their similarity through deep feature extraction.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Feature Analysis</h4>
            <p className="text-sm">
              The AI analyzes various aspects like stroke patterns, pressure variations, 
              writing style, and geometric features to determine authenticity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Confidence Score</h4>
            <p className="text-sm">
              Results include a confidence score indicating how certain the model is about 
              its prediction, helping you make informed decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Real-time Processing</h4>
            <p className="text-sm">
              Get instant results with our optimized inference pipeline that processes 
              signatures in real-time without compromising accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
