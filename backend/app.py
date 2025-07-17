import os
import base64
import numpy as np
import cv2
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
from config.config import Config
from data.data_preprocessing import DataPreprocessor
from utils.losses import contrastive_loss
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variables for model and config
model = None
config = None
preprocessor = None

def load_model():
    """Load the trained Siamese model"""
    global model, config, preprocessor
    try:
        config = Config()
        preprocessor = DataPreprocessor(config)
        
        if os.path.exists(config.MODEL_SAVE_PATH):
            model = tf.keras.models.load_model(
                config.MODEL_SAVE_PATH, 
                custom_objects={'contrastive_loss': contrastive_loss}
            )
            logger.info("Model loaded successfully")
        else:
            logger.warning(f"Model file not found at {config.MODEL_SAVE_PATH}")
            model = None
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        model = None

def preprocess_image(image_data, is_base64=True):
    """Preprocess image for model prediction"""
    try:
        if is_base64:
            # Decode base64 image
            image_data = image_data.split(',')[1] if ',' in image_data else image_data
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
        else:
            image = Image.open(image_data)
        
        # Convert to numpy array
        image_array = np.array(image)
        
        # Convert to grayscale if needed
        if len(image_array.shape) == 3:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
        
        # Resize to model input shape
        image_resized = cv2.resize(image_array, config.IMAGE_SHAPE)
        
        # Normalize pixel values
        image_normalized = image_resized.astype(np.float32) / 255.0
        
        # Add channel dimension
        image_final = np.expand_dims(image_normalized, axis=-1)
        
        return image_final
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        return None

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'message': 'Signature verification API is running'
    })

@app.route('/api/verify', methods=['POST'])
def verify_signatures():
    """Verify two signatures for authenticity"""
    try:
        if model is None:
            return jsonify({
                'error': 'Model not loaded. Please train the model first.',
                'success': False
            }), 500
        
        data = request.json
        
        if 'signature1' not in data or 'signature2' not in data:
            return jsonify({
                'error': 'Both signature1 and signature2 are required',
                'success': False
            }), 400
        
        # Preprocess images
        img1 = preprocess_image(data['signature1'])
        img2 = preprocess_image(data['signature2'])
        
        if img1 is None or img2 is None:
            return jsonify({
                'error': 'Failed to process one or both images',
                'success': False
            }), 400
        
        # Add batch dimension
        img1_batch = np.expand_dims(img1, axis=0)
        img2_batch = np.expand_dims(img2, axis=0)
        
        # Make prediction
        prediction = model.predict([img1_batch, img2_batch])
        similarity_score = float(prediction[0][0])
        
        # Determine if signatures match (threshold can be adjusted)
        threshold = 0.5
        is_genuine = similarity_score > threshold
        
        return jsonify({
            'success': True,
            'similarity_score': similarity_score,
            'is_genuine': is_genuine,
            'confidence': abs(similarity_score - 0.5) * 2,  # Convert to confidence score
            'threshold': threshold
        })
        
    except Exception as e:
        logger.error(f"Error in verification: {str(e)}")
        return jsonify({
            'error': f'Internal server error: {str(e)}',
            'success': False
        }), 500

@app.route('/api/train', methods=['POST'])
def train_model_endpoint():
    """Trigger model training"""
    try:
        from train import train_model
        
        # Run training in background (in production, use Celery or similar)
        model_trained, test_data = train_model()
        
        # Update global model
        global model
        model = model_trained
        
        return jsonify({
            'success': True,
            'message': 'Model training completed successfully'
        })
        
    except Exception as e:
        logger.error(f"Error in training: {str(e)}")
        return jsonify({
            'error': f'Training failed: {str(e)}',
            'success': False
        }), 500

@app.route('/api/evaluate', methods=['GET'])
def evaluate_model_endpoint():
    """Evaluate the current model"""
    try:
        if model is None:
            return jsonify({
                'error': 'No model loaded to evaluate',
                'success': False
            }), 400
        
        from evaluate import evaluate_model
        loss, accuracy = evaluate_model()
        
        return jsonify({
            'success': True,
            'accuracy': float(accuracy),
            'loss': float(loss),
            'accuracy_percentage': float(accuracy * 100)
        })
        
    except Exception as e:
        logger.error(f"Error in evaluation: {str(e)}")
        return jsonify({
            'error': f'Evaluation failed: {str(e)}',
            'success': False
        }), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Get information about the current model"""
    try:
        if model is None:
            return jsonify({
                'model_loaded': False,
                'message': 'No model loaded'
            })
        
        return jsonify({
            'model_loaded': True,
            'input_shape': config.INPUT_SHAPE,
            'image_shape': config.IMAGE_SHAPE,
            'model_path': config.MODEL_SAVE_PATH,
            'parameters': {
                'batch_size': config.BATCH_SIZE,
                'epochs': config.EPOCHS,
                'learning_rate': config.LEARNING_RATE
            }
        })
        
    except Exception as e:
        logger.error(f"Error getting model info: {str(e)}")
        return jsonify({
            'error': f'Failed to get model info: {str(e)}',
            'success': False
        }), 500

if __name__ == '__main__':
    # Load model on startup
    load_model()
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
