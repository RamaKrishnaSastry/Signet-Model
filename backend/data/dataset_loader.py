import os
import pathlib
import numpy as np
import tensorflow as tf
import rarfile
from config.config import Config

class DatasetLoader:
    def __init__(self, config=None):
        self.config = config or Config()
        
    def download_and_extract_dataset(self):
        """Download and extract the signature dataset"""
        print("Downloading dataset...")
        dataset_path = tf.keras.utils.get_file(
            "Signatures", 
            origin=self.config.DATASET_URL, 
            cache_dir="."
        )
        
        # Extract .rar file
        extract_path = os.path.splitext(dataset_path)[0]
        os.makedirs(f"{extract_path}_unzipped", exist_ok=True)
        
        print("Extracting dataset...")
        with rarfile.RarFile(dataset_path, "r") as rf:
            rf.extractall(self.config.DATASET_PATH)
        
        print(f"Dataset extracted to: {self.config.EXTRACT_PATH}")
        return self.config.EXTRACT_PATH
    
    def load_dataset_paths(self):
        """Load file paths for original and forged signatures"""
        path = pathlib.Path(self.config.EXTRACT_PATH)
        
        orig, forg = {}, {}
        for i in range(55):
            orig[i] = np.array(list(path.glob(f'full_org/original_{i+1}_*.png')))
            forg[i] = np.array(list(path.glob(f'full_forg/forgeries_{i+1}_*.png')))
        
        dataset = {}
        for i in range(55):
            dataset[i] = np.concatenate((orig[i], forg[i]))
        
        return dataset, orig, forg