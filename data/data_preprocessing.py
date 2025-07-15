import numpy as np
import cv2
from sklearn.model_selection import train_test_split
from config.config import Config

class DataPreprocessor:
    def __init__(self, config=None):
        self.config = config or Config()
    
    def preprocess_image(self, image_path):
        """Preprocess a single image"""
        img = cv2.imread(str(image_path), cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, self.config.IMAGE_SHAPE, interpolation=cv2.INTER_LANCZOS4)
        img = img / 255.0  # Normalize pixel values to [0, 1]
        img = 1 - img  # Invert colors
        return np.expand_dims(img, axis=-1)  # Add channel dimension
    
    def preprocess_dataset(self, dataset, orig):
        """Preprocess the entire dataset"""
        processed_dataset = {}
        for i in dataset:
            processed_dataset[i] = {
                "originals": [self.preprocess_image(path) for path in dataset[i][:len(orig[i])]],
                "forgeries": [self.preprocess_image(path) for path in dataset[i][len(orig[i]):]]
            }
        return processed_dataset
    
    def create_pairs(self, processed_dataset, max_pairs_per_class=1000):
        """Create pairs of images for siamese network training"""
        pairs, labels = [], []
        
        for keys, values in processed_dataset.items():
            originals = values["originals"]
            forgeries = values["forgeries"]
            
            # Generate positive pairs (original-original)
            positive_pairs = []
            for i in range(len(originals)):
                for j in range(i + 1, len(originals)):
                    positive_pairs.append([originals[i], originals[j]])
            
            # Generate negative pairs (original-forgery)
            negative_pairs = []
            for orig_img in originals:
                for forg_img in forgeries:
                    negative_pairs.append([orig_img, forg_img])
            
            # Add pairs and corresponding labels
            pairs.extend(positive_pairs)
            labels.extend([1] * len(positive_pairs))  # Positive pairs labeled as 1
            pairs.extend(negative_pairs)
            labels.extend([0] * len(negative_pairs))  # Negative pairs labeled as 0
        
        return np.array(pairs), np.array(labels)
    
    def split_data(self, pairs, labels):
        """Split data into train, validation, and test sets"""
        train_pairs, temp_pairs, train_labels, temp_labels = train_test_split(
            pairs, labels, 
            test_size=self.config.TEST_SIZE, 
            random_state=self.config.RANDOM_STATE_TRAIN
        )
        
        val_pairs, test_pairs, val_labels, test_labels = train_test_split(
            temp_pairs, temp_labels, 
            test_size=self.config.VAL_SIZE, 
            random_state=self.config.RANDOM_STATE_VAL
        )
        
        return (train_pairs, train_labels), (val_pairs, val_labels), (test_pairs, test_labels)