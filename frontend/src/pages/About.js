import React from 'react';
import { Shield, Brain, Database, Zap, Github, Mail, User } from 'lucide-react';

const About = () => {
  const technologies = [
    {
      name: "TensorFlow",
      description: "Deep learning framework for building and training neural networks"
    },
    {
      name: "Siamese Networks",
      description: "Twin neural networks for learning similarity between input pairs"
    },
    {
      name: "SigNet Architecture",
      description: "Specialized CNN architecture designed for signature feature extraction"
    },
    {
      name: "React",
      description: "Modern frontend framework for building interactive user interfaces"
    },
    {
      name: "Flask",
      description: "Lightweight web framework for serving the ML model API"
    },
    {
      name: "OpenCV",
      description: "Computer vision library for image preprocessing and analysis"
    }
  ];

  const teamMembers = [
    {
      name: "AI Research Team",
      role: "Machine Learning Engineers",
      description: "Specialists in deep learning and computer vision"
    },
    {
      name: "Development Team",
      role: "Full-Stack Developers",
      description: "Frontend and backend development experts"
    },
    {
      name: "Data Science Team",
      role: "Data Scientists",
      description: "Data preprocessing and model optimization specialists"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          About SigNet
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          A state-of-the-art signature verification system powered by Siamese Neural Networks
          and SigNet architecture for accurate fraud detection and document authentication.
        </p>
      </div>

      {/* Project Overview */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Project Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Objectives</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Develop an accurate signature verification system</li>
              <li>• Detect forged signatures with high precision</li>
              <li>• Provide real-time verification capabilities</li>
              <li>• Create an intuitive user interface</li>
              <li>• Implement scalable ML infrastructure</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Siamese Neural Network architecture</li>
              <li>• SigNet-based feature extraction</li>
              <li>• CEDAR dataset training</li>
              <li>• Real-time web interface</li>
              <li>• Confidence score reporting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-purple-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Technical Architecture</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Machine Learning Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Data Processing</h4>
                <p className="text-sm text-white/80">
                  Image preprocessing, normalization, and augmentation using OpenCV and PIL
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Model Training</h4>
                <p className="text-sm text-white/80">
                  Siamese network training with contrastive loss and AdamW optimizer
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Inference</h4>
                <p className="text-sm text-white/80">
                  Real-time signature comparison with confidence scoring
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">System Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Backend (Flask API)</h4>
                <p className="text-sm text-white/80">
                  RESTful API serving the trained model with endpoints for verification,
                  training, and evaluation
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Frontend (React)</h4>
                <p className="text-sm text-white/80">
                  Modern web interface with drag-and-drop uploads and real-time results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Zap className="h-6 w-6 text-yellow-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
              <p className="text-sm text-white/80">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-green-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">CEDAR Signature Dataset</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">55</h3>
            <p className="text-white/80">Different Signers</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">24</h3>
            <p className="text-white/80">Genuine Signatures per Signer</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">24</h3>
            <p className="text-white/80">Forged Signatures per Signer</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">2,640</h3>
            <p className="text-white/80">Total Signature Images</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <p className="text-white/80 text-sm">
            The CEDAR signature database is a comprehensive collection of signatures used for
            research in signature verification and writer identification. It contains both
            genuine signatures and skilled forgeries, making it ideal for training robust
            verification systems.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <User className="h-6 w-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Development Team</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-blue-400 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-white/80">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-white/80 mb-6">
            Have questions about SigNet or want to contribute to the project?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/yourusername/signet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center"
            >
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </a>
            
            <a
              href="mailto:contact@signet.ai"
              className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
