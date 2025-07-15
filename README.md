# Signet-Model

## 📖 Overview

This project implements a **Siamese Neural Network** for signature verification using the **SigNet** architecture. The system can distinguish between genuine and forged signatures by learning to compare pairs of signature images and determine their similarity.

## 🎯 Project Objectives

- **Signature Authentication**: Verify the authenticity of handwritten signatures
- **Fraud Detection**: Identify forged signatures with high accuracy
- **Real-world Application**: Provide a practical solution for document verification systems
- **Deep Learning Implementation**: Utilize state-of-the-art Siamese networks for one-shot learning

## 🏗️ Architecture

The system is built using a **Siamese Neural Network** architecture with the following components:

### SigNet Base Model
- **Convolutional Layers**: Feature extraction from signature images
- **Local Response Normalization**: Improves generalization
- **Max Pooling**: Reduces spatial dimensions
- **Dropout**: Prevents overfitting
- **Dense Layers**: Final feature representation

### Siamese Framework
- **Twin Networks**: Two identical SigNet models sharing weights
- **Distance Calculation**: Computes absolute difference between feature vectors
- **Similarity Prediction**: Binary classification (genuine/forged)

## 📊 Dataset

The project uses the **CEDAR Signature Dataset** which contains:
- **55 different signers**
- **24 genuine signatures** per signer
- **24 forged signatures** per signer
- **Total**: 2,640 signature images

**Dataset Source**: [CEDAR Buffalo](http://www.cedar.buffalo.edu/NIJ/data/signatures.rar)

## 🗂️ Project Structure

```
d:\NITK\ALPR-final\
├── 📁 config/
│   └── config.py              # Configuration parameters
├── 📁 data/
│   ├── __init__.py
│   ├── dataset_loader.py      # Dataset downloading and loading
│   └── data_preprocessing.py   # Image preprocessing and pair generation
├── 📁 models/
│   ├── __init__.py
│   ├── signet.py             # SigNet base model architecture
│   └── siamese.py            # Siamese network implementation
├── 📁 utils/
│   ├── __init__.py
│   ├── losses.py             # Custom loss functions
│   └── visualization.py      # Plotting and visualization utilities
├── 📁 dataset/               # Downloaded dataset (auto-created)
├── train.py                  # Training script
├── evaluate.py               # Model evaluation script
├── main.py                   # Main execution script
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

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
```

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

- **Your Name** - Initial work
- **Contributors** - See contributors list

## 🙏 Acknowledgments

- CEDAR Buffalo for providing the signature dataset
- TensorFlow team for the deep learning framework
- Open source community for various utilities

---

**Note**: This project is for educational and research purposes. For production use, consider additional security measures and