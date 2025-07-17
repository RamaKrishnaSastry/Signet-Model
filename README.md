# SigNet - End-to-End Signature Verification System

## 📖 Overview

This is a comprehensive **end-to-end signature verification system** that combines a powerful machine learning backend with a modern React frontend. The system uses **Siamese Neural Networks** with the **SigNet architecture** to distinguish between genuine and forged signatures with high accuracy.

## 🎯 Project Objectives

- **Signature Authentication**: Verify the authenticity of handwritten signatures
- **Fraud Detection**: Identify forged signatures with high accuracy
- **Real-world Application**: Provide a practical solution for document verification systems
- **Deep Learning Implementation**: Utilize state-of-the-art Siamese networks for one-shot learning
- **User-Friendly Interface**: Modern web application for easy signature verification

## 🏗️ System Architecture

### Backend (Machine Learning API)

- **Framework**: Flask with CORS support
- **ML Model**: Siamese Neural Network with SigNet base architecture
- **Features**: Training, evaluation, and real-time inference endpoints
- **Image Processing**: OpenCV and PIL for preprocessing

### Frontend (React Web Application)

- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom gradients and animations
- **Features**: Drag-and-drop upload, real-time results, model management
- **UI Components**: Responsive design with loading states and error handling

## 📊 Dataset

The project uses the **CEDAR Signature Dataset** which contains:

- **55 different signers**
- **24 genuine signatures** per signer
- **24 forged signatures** per signer
- **Total**: 2,640 signature images

**Dataset Source**: [CEDAR Buffalo](http://www.cedar.buffalo.edu/NIJ/data/signatures.rar)

## 🗂️ Project Structure

```
SigNet-End2End/
├── 📁 backend/
│   ├── app.py                     # Flask API server
│   ├── main.py                    # ML pipeline entry point
│   ├── train.py                   # Training script
│   ├── evaluate.py                # Evaluation script
│   ├── requirements.txt           # Python dependencies
│   ├── 📁 config/
│   │   └── config.py              # Configuration parameters
│   ├── 📁 data/
│   │   ├── __init__.py
│   │   ├── dataset_loader.py      # Dataset downloading and loading
│   │   └── data_preprocessing.py  # Image preprocessing and pair generation
│   ├── 📁 models/
│   │   ├── __init__.py
│   │   ├── signet.py              # SigNet base model
│   │   └── siamese.py             # Siamese network implementation
│   └── 📁 utils/
│       ├── __init__.py
│       ├── losses.py              # Custom loss functions
│       └── visualization.py       # Training visualization
├── 📁 frontend/
│   ├── package.json               # Node.js dependencies
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── 📁 public/
│   │   └── index.html             # HTML template
│   └── 📁 src/
│       ├── index.js               # React entry point
│       ├── App.js                 # Main app component
│       ├── index.css              # Global styles
│       ├── 📁 components/
│       │   ├── Navbar.js          # Navigation component
│       │   ├── SignatureUpload.js # File upload component
│       │   ├── VerificationResult.js # Results display
│       │   └── LoadingSpinner.js  # Loading indicator
│       ├── 📁 pages/
│       │   ├── Home.js            # Landing page
│       │   ├── Verify.js          # Signature verification page
│       │   ├── Train.js           # Model training page
│       │   └── About.js           # About page
│       └── 📁 services/
│           └── api.js             # API service layer
├── README.md                      # This file
├── LICENSE                        # MIT License
└── SigNet.pdf                     # Technical documentation
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git** for version control

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Create virtual environment**:

   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Flask API server**:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The web application will be available at `http://localhost:3000`

## 🔧 Usage

### 1. **Training the Model**

- Navigate to the **Train** page in the web interface
- Click **"Start Training"** to begin model training
- Monitor the training progress and view model information
- Evaluate the trained model to check performance

### 2. **Verifying Signatures**

- Go to the **Verify** page
- Upload two signature images:
  - **Reference Signature**: The authentic signature to compare against
  - **Signature to Verify**: The signature you want to authenticate
- Click **"Verify Signatures"** to get results
- View similarity score, confidence level, and authentication result

### 3. **API Endpoints**

The backend provides the following REST API endpoints:

- `GET /api/health` - Health check
- `POST /api/verify` - Verify two signatures
- `POST /api/train` - Start model training
- `GET /api/evaluate` - Evaluate current model
- `GET /api/model-info` - Get model information

## 🎨 Features

### Web Interface Features

- **Modern Design**: Gradient backgrounds and glass-morphism effects
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Drag & Drop**: Easy signature image uploading
- **Real-time Results**: Instant verification with detailed metrics
- **Progress Tracking**: Visual feedback for long-running operations

### ML Features

- **Siamese Architecture**: Twin networks for similarity learning
- **SigNet Base Model**: Specialized CNN for signature features
- **Contrastive Loss**: Optimized for binary similarity tasks
- **Data Augmentation**: Improved robustness through data variations
- **Transfer Learning**: Pre-trained features for better performance

## � Performance

- **Accuracy**: 90%+ on CEDAR test dataset
- **Speed**: Real-time inference (~100ms per verification)
- **Scalability**: Concurrent request handling with Flask
- **Memory**: Optimized model size for production deployment

## �️ Development

### Adding New Features

1. **Backend Changes**:

   - Add new endpoints in `app.py`
   - Implement ML functionality in respective modules
   - Update API documentation

2. **Frontend Changes**:
   - Create new components in `src/components/`
   - Add new pages in `src/pages/`
   - Update routing in `App.js`

### Testing

- **Backend**: Run unit tests with pytest
- **Frontend**: Use Jest and React Testing Library
- **Integration**: Test API endpoints with Postman or curl

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CEDAR Database**: University at Buffalo for providing the signature dataset
- **SigNet Paper**: Original research on signature verification architectures
- **TensorFlow Team**: For the excellent deep learning framework
- **React Community**: For the modern frontend development tools

## 📞 Support

For questions, issues, or contributions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation in `SigNet.pdf`

---

**Made with ❤️ for secure document verification**
│ ├── **init**.py
│ ├── signet.py # SigNet base model architecture
│ └── siamese.py # Siamese network implementation
├── 📁 utils/
│ ├── **init**.py
│ ├── losses.py # Custom loss functions
│ └── visualization.py # Plotting and visualization utilities
├── 📁 dataset/ # Downloaded dataset (auto-created)
├── train.py # Training script
├── evaluate.py # Model evaluation script
├── main.py # Main execution script
├── requirements.txt # Python dependencies
└── README.md # This file

````

## ⚙️ Configuration

Key parameters can be modified in `config/config.py`:

```python
# Image processing
IMAGE_SHAPE = (110, 70)        # Signature image dimensions
INPUT_SHAPE = (70, 110, 1)     # Model input shape

# Training parameters
BATCH_SIZE = 128               # Training batch size
EPOCHS = 10                    # Number of training epochs
LEARNING_RATE = 0.0001         # Learning rate for AdamW optimizer
WEIGHT_DECAY = 0.0005          # L2 regularization

# Data splitting
TEST_SIZE = 0.3                # Test set proportion
VAL_SIZE = 0.5                 # Validation set proportion (of remaining data)
````

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- GPU support (recommended for faster training)
- 4GB+ RAM
- Internet connection (for dataset download)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd ALPR-final
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the complete pipeline**:
   ```bash
   python main.py
   ```

### Alternative Execution Methods

**Training only**:

```bash
python train.py
```

**Evaluation only** (requires pre-trained model):

```bash
python evaluate.py
```

**Custom configuration**:

```python
from config.config import Config
config = Config()
config.EPOCHS = 20  # Modify parameters
config.BATCH_SIZE = 64
```

## 📈 Training Process

### Data Preprocessing

1. **Image Loading**: Signatures loaded from dataset
2. **Normalization**: Pixel values normalized to [0, 1]
3. **Color Inversion**: Background becomes black, signatures white
4. **Resizing**: All images resized to 110×70 pixels
5. **Pair Generation**: Positive (genuine-genuine) and negative (genuine-forged) pairs created

### Model Training

1. **Architecture**: SigNet-based Siamese network
2. **Loss Function**: Contrastive loss with margin
3. **Optimizer**: AdamW with weight decay
4. **Metrics**: Binary accuracy
5. **Validation**: 30% of data used for validation

### Training Output

```
Training pairs: XXXXX
Validation pairs: XXXXX
Test pairs: XXXXX
Epoch 1/10
████████████████████████████████ - 120s - loss: 0.4532 - accuracy: 0.7845 - val_loss: 0.3421 - val_accuracy: 0.8234
...
```

## 🔍 Model Evaluation

The trained model is evaluated on:

- **Test Accuracy**: Overall classification accuracy
- **Test Loss**: Contrastive loss value
- **Confusion Matrix**: True/False positives and negatives
- **ROC Curve**: Receiver Operating Characteristic analysis

### Expected Performance

- **Accuracy**: ~85-90% on test set
- **Training Time**: 10-15 minutes on GPU
- **Model Size**: ~50MB

## 🧠 Technical Details

### SigNet Architecture

```
Input (70×110×1)
    ↓
Conv2D(96, 11×11) → ReLU → LRN → MaxPool(3×3, stride=2)
    ↓
Conv2D(256, 5×5) → ReLU → LRN → MaxPool(3×3, stride=2) → Dropout(0.3)
    ↓
Conv2D(384, 3×3) → ReLU
    ↓
Conv2D(256, 3×3) → ReLU → MaxPool(3×3, stride=2) → Dropout(0.3)
    ↓
Flatten → Dense(1024) → ReLU → Dropout(0.5) → Dense(128) → ReLU
    ↓
Feature Vector (128-dimensional)
```

### Contrastive Loss

```python
loss = α × (1 - y) × d² + β × y × max(0, margin - d)²
```

Where:

- `d`: Distance between feature vectors
- `y`: Label (1 for similar, 0 for dissimilar)
- `α, β`: Loss weights
- `margin`: Margin for dissimilar pairs

## 📊 Visualization

The system provides various visualization tools:

1. **Training History**: Loss and accuracy curves
2. **Sample Pairs**: Genuine and forged signature pairs
3. **Feature Visualization**: t-SNE plots of learned features
4. **Confusion Matrix**: Classification performance matrix

## 🛠️ Customization

### Adding New Features

1. **Custom Loss Functions**: Add to `utils/losses.py`
2. **New Architectures**: Extend `models/` directory
3. **Data Augmentation**: Modify `data/data_preprocessing.py`
4. **Evaluation Metrics**: Update `evaluate.py`

### Configuration Options

```python
# Custom dataset path
Config.DATASET_PATH = "./custom_dataset"

# Model architecture modifications
Config.INPUT_SHAPE = (100, 150, 1)  # Different image size

# Training hyperparameters
Config.LEARNING_RATE = 0.001
Config.BATCH_SIZE = 64
Config.EPOCHS = 50
```

## 🐛 Troubleshooting

### Common Issues

1. **GPU Memory Error**:

   - Reduce `BATCH_SIZE` in config
   - Use mixed precision training

2. **Dataset Download Fails**:

   - Check internet connection
   - Manually download and extract dataset

3. **Low Accuracy**:

   - Increase `EPOCHS`
   - Adjust learning rate
   - Check data preprocessing

4. **Import Errors**:
   - Verify all dependencies installed
   - Check Python path configuration

### Performance Optimization

1. **Enable GPU**: Ensure CUDA and cuDNN installed
2. **Mixed Precision**: Use `tf.keras.mixed_precision`
3. **Data Pipeline**: Optimize with `tf.data.Dataset`
4. **Batch Size**: Increase if sufficient GPU memory

## 🔬 Research Applications

This implementation can be extended for:

- **Document Authentication**: Banking, legal documents
- **Biometric Systems**: Multi-modal authentication
- **Forensic Analysis**: Handwriting analysis
- **Academic Research**: Signature verification algorithms

## 📚 References

1. **SigNet Paper**: "Learning Features for Offline Handwritten Signature Verification"
2. **Siamese Networks**: "Siamese Neural Networks for One-shot Image Recognition"
3. **CEDAR Dataset**: "CEDAR Signature Database"
4. **Contrastive Loss**: "Dimensionality Reduction by Learning an Invariant Mapping"

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ponnapally Rama Krishna Sastry** - Initial work
- **Contributors** - See contributors list

## 🙏 Acknowledgments

- CEDAR Buffalo for providing the signature dataset
- TensorFlow team for the deep learning framework
- Open source community for various utilities

---

**Note**: This project is for educational and research purposes. For production use, consider additional security measures and
