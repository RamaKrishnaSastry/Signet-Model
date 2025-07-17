import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Zap, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Advanced Security",
      description: "State-of-the-art Siamese Neural Networks for accurate signature verification"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "High Accuracy",
      description: "Achieve over 95% accuracy in distinguishing genuine from forged signatures"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Fast Processing",
      description: "Real-time signature verification with instant results"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "User Friendly",
      description: "Simple drag-and-drop interface for easy signature comparison"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          SigNet
          <span className="block text-3xl md:text-4xl font-normal text-white/80 mt-2">
            Signature Verification System
          </span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          Powered by advanced Siamese Neural Networks, our system provides accurate and reliable 
          signature verification to protect against fraud and ensure document authenticity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/verify"
            className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center"
          >
            Start Verification
          </Link>
          <Link
            to="/about"
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-shadow hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-4 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 text-center">
              {feature.title}
            </h3>
            <p className="text-white/80 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Upload Signatures</h3>
            <p className="text-white/80">
              Upload two signature images - the reference signature and the one to be verified
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
            <p className="text-white/80">
              Our Siamese Neural Network analyzes the signatures using advanced feature extraction
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Get Results</h3>
            <p className="text-white/80">
              Receive instant verification results with confidence scores and detailed analysis
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Secure Your Documents?
        </h2>
        <p className="text-xl text-white/80 mb-8">
          Start verifying signatures with our advanced AI-powered system today.
        </p>
        <Link
          to="/verify"
          className="btn-primary text-white px-12 py-4 rounded-lg font-semibold text-xl inline-flex items-center justify-center"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
