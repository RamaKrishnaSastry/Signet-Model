import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras import layers
from config.config import Config

class SigNetModel:
    def __init__(self, config=None):
        self.config = config or Config()
    
    def create_base_model(self):
        """Create the base SigNet model"""
        model = Sequential([
            layers.Conv2D(96, (11, 11), padding="same", activation="relu", 
                         input_shape=self.config.INPUT_SHAPE),
            layers.Lambda(lambda x: tf.nn.local_response_normalization(
                x, depth_radius=5, bias=2, alpha=1e-4, beta=0.75)),
            layers.MaxPooling2D((3, 3), strides=2),
            
            layers.Conv2D(256, (5, 5), padding="same", activation="relu"),
            layers.Lambda(lambda x: tf.nn.local_response_normalization(
                x, depth_radius=5, bias=2, alpha=1e-4, beta=0.75)),
            layers.MaxPool2D((3, 3), strides=2),
            layers.Dropout(rate=0.3),
            
            layers.Conv2D(384, (3, 3), padding="same", activation="relu"),
            layers.Conv2D(256, (3, 3), padding="same", activation="relu"),
            layers.MaxPool2D((3, 3), strides=2),
            layers.Dropout(rate=0.3),
            
            layers.Flatten(),
            layers.Dense(1024, activation="relu"),
            layers.Dropout(0.5),
            layers.Dense(128, activation="relu")
        ])
        
        return model