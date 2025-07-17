import os

class Config:
    # Dataset configuration
    DATASET_URL = "http://www.cedar.buffalo.edu/NIJ/data/signatures.rar"
    DATASET_PATH = "./dataset"
    EXTRACT_PATH = "./dataset/signatures"
    
    # Image processing configuration
    IMAGE_SHAPE = (110, 70)  # (width, height)
    INPUT_SHAPE = (IMAGE_SHAPE[1], IMAGE_SHAPE[0], 1)  # (height, width, channels)
    
    # Training configuration
    BATCH_SIZE = 128
    EPOCHS = 10
    LEARNING_RATE = 0.0001
    WEIGHT_DECAY = 0.0005
    
    # Data split configuration
    TEST_SIZE = 0.3
    VAL_SIZE = 0.5
    RANDOM_STATE_TRAIN = 2
    RANDOM_STATE_VAL = 24
    
    # Model configuration
    MODEL_SAVE_PATH = "./siamese_model.h5"
    
    # Loss function parameters
    MARGIN = 1.0
    ALPHA = 1.0
    BETA = 1.0