import tensorflow as tf
from models.signet import SigNetModel
from config.config import Config

class SiameseModel:
    def __init__(self, config=None):
        self.config = config or Config()
        self.signet = SigNetModel(config)
    
    def create_siamese_model(self):
        """Create the Siamese model using SigNet as base"""
        base_model = self.signet.create_base_model()
        
        input_a = tf.keras.Input(shape=self.config.INPUT_SHAPE)
        input_b = tf.keras.Input(shape=self.config.INPUT_SHAPE)
        
        feature_1 = base_model(input_a)
        feature_2 = base_model(input_b)
        
        distance = tf.keras.layers.Lambda(
            lambda tensors: tf.abs(tensors[0] - tensors[1])
        )([feature_1, feature_2])
        
        output = tf.keras.layers.Dense(1, activation='sigmoid')(distance)
        
        return tf.keras.Model([input_a, input_b], output)