import tensorflow as tf
import numpy as np
from config.config import Config
from data.dataset_loader import DatasetLoader
from data.data_preprocessing import DataPreprocessor
from models.siamese import SiameseModel
from utils.losses import contrastive_loss
from utils.visualization import Visualizer

def train_model():
    config = Config()
    
    # Initialize components
    loader = DatasetLoader(config)
    preprocessor = DataPreprocessor(config)
    siamese_model_builder = SiameseModel(config)
    visualizer = Visualizer()
    
    # Load and preprocess data
    print("Loading dataset...")
    extract_path = loader.download_and_extract_dataset()
    dataset, orig, forg = loader.load_dataset_paths()
    
    print("Preprocessing data...")
    processed_dataset = preprocessor.preprocess_dataset(dataset, orig)
    pairs, labels = preprocessor.create_pairs(processed_dataset)
    
    # Split data
    (train_pairs, train_labels), (val_pairs, val_labels), (test_pairs, test_labels) = preprocessor.split_data(pairs, labels)
    
    print(f"Training pairs: {len(train_pairs)}")
    print(f"Validation pairs: {len(val_pairs)}")
    print(f"Test pairs: {len(test_pairs)}")
    
    # Create and compile model
    print("Creating Siamese model...")
    with tf.device('/GPU:0'):
        siamese_model = siamese_model_builder.create_siamese_model()
        
        optimizer = tf.keras.optimizers.AdamW(
            learning_rate=config.LEARNING_RATE, 
            weight_decay=config.WEIGHT_DECAY
        )
        
        siamese_model.compile(
            optimizer=optimizer,
            loss=contrastive_loss,
            metrics=['accuracy']
        )
    
    # Train model
    print("Training model...")
    history = siamese_model.fit(
        x=[train_pairs[:, 0], train_pairs[:, 1]],
        y=train_labels,
        batch_size=config.BATCH_SIZE,
        epochs=config.EPOCHS,
        validation_data=([val_pairs[:, 0], val_pairs[:, 1]], val_labels),
        verbose=1
    )
    
    # Save model
    siamese_model.save(config.MODEL_SAVE_PATH)
    print(f"Model saved to {config.MODEL_SAVE_PATH}")
    
    # Visualize training history
    visualizer.plot_training_history(history)
    
    return siamese_model, (test_pairs, test_labels)

if __name__ == "__main__":
    model, test_data = train_model()