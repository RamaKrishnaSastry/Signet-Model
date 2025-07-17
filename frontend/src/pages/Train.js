import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { trainModel, evaluateModel, getModelInfo } from '../services/api';
import { Play, Brain, BarChart3, Info } from 'lucide-react';

const Train = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [trainingComplete, setTrainingComplete] = useState(false);

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const fetchModelInfo = async () => {
    try {
      const info = await getModelInfo();
      setModelInfo(info);
    } catch (error) {
      console.error('Failed to fetch model info:', error);
    }
  };

  const handleTrain = async () => {
    setIsTraining(true);
    setTrainingComplete(false);

    try {
      const response = await trainModel();
      
      if (response.success) {
        toast.success('Model training completed successfully!');
        setTrainingComplete(true);
        await fetchModelInfo();
      } else {
        toast.error(response.error || 'Training failed');
      }
    } catch (error) {
      console.error('Training error:', error);
      toast.error('Failed to train model. Please try again.');
    } finally {
      setIsTraining(false);
    }
  };

  const handleEvaluate = async () => {
    if (!modelInfo?.model_loaded) {
      toast.error('No trained model available for evaluation');
      return;
    }

    setIsEvaluating(true);

    try {
      const response = await evaluateModel();
      
      if (response.success) {
        setEvaluationResult(response);
        toast.success('Model evaluation completed!');
      } else {
        toast.error(response.error || 'Evaluation failed');
      }
    } catch (error) {
      console.error('Evaluation error:', error);
      toast.error('Failed to evaluate model. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Model Training & Evaluation
        </h1>
        <p className="text-xl text-white/80">
          Train and evaluate the Siamese Neural Network for signature verification
        </p>
      </div>

      {/* Model Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Info className="h-6 w-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Model Status</h2>
        </div>
        
        {modelInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  modelInfo.model_loaded ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className="text-white/80">
                  {modelInfo.model_loaded ? 'Model Loaded' : 'No Model Available'}
                </span>
              </div>
            </div>
            
            {modelInfo.model_loaded && (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Input Shape</h3>
                  <p className="text-white/80">
                    {modelInfo.input_shape?.join(' × ') || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Image Size</h3>
                  <p className="text-white/80">
                    {modelInfo.image_shape?.join(' × ') || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Batch Size</h3>
                  <p className="text-white/80">
                    {modelInfo.parameters?.batch_size || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Epochs</h3>
                  <p className="text-white/80">
                    {modelInfo.parameters?.epochs || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Learning Rate</h3>
                  <p className="text-white/80">
                    {modelInfo.parameters?.learning_rate || 'N/A'}
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <LoadingSpinner message="Loading model information..." />
          </div>
        )}
      </div>

      {/* Training Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-purple-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Training</h2>
        </div>
        
        <p className="text-white/80 mb-6">
          Train the Siamese Neural Network on the CEDAR signature dataset. This process will
          download the dataset, preprocess the images, and train the model using contrastive loss.
        </p>
        
        {isTraining ? (
          <div className="py-8">
            <LoadingSpinner message="Training model... This may take several minutes." />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleTrain}
              className="btn-primary text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Training
            </button>
            
            {trainingComplete && (
              <div className="flex items-center text-green-400">
                <span className="text-lg font-semibold">Training completed successfully!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Evaluation Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow mb-8">
        <div className="flex items-center mb-6">
          <BarChart3 className="h-6 w-6 text-green-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Evaluation</h2>
        </div>
        
        <p className="text-white/80 mb-6">
          Evaluate the trained model on the test dataset to measure its performance
          and accuracy in signature verification tasks.
        </p>
        
        {isEvaluating ? (
          <div className="py-8">
            <LoadingSpinner message="Evaluating model..." />
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleEvaluate}
              disabled={!modelInfo?.model_loaded}
              className={`btn-secondary text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center ${
                !modelInfo?.model_loaded ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Evaluate Model
            </button>
            
            {evaluationResult && (
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Evaluation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">Accuracy</h4>
                    <p className="text-3xl font-bold text-green-400">
                      {evaluationResult.accuracy_percentage.toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">Loss</h4>
                    <p className="text-3xl font-bold text-blue-400">
                      {evaluationResult.loss.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 card-shadow">
        <h3 className="text-2xl font-bold text-white mb-4">Training Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
          <div>
            <h4 className="font-semibold text-white mb-2">Dataset</h4>
            <p className="text-sm">
              The model is trained on the CEDAR signature dataset containing 55 signers
              with 24 genuine and 24 forged signatures each.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Architecture</h4>
            <p className="text-sm">
              Uses a Siamese Neural Network with SigNet as the base model for feature
              extraction and similarity comparison.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Training Process</h4>
            <p className="text-sm">
              The model learns to distinguish between genuine and forged signatures
              using contrastive loss and data augmentation techniques.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Performance</h4>
            <p className="text-sm">
              Expected accuracy of 90%+ on the test set with proper training and
              hyperparameter tuning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
