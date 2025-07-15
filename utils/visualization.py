import matplotlib.pyplot as plt
import numpy as np

class Visualizer:
    @staticmethod
    def show_image(image, title="Image", cmap="gray"):
        """Display a single image"""
        plt.figure(figsize=(8, 6))
        plt.imshow(image, cmap=cmap)
        plt.title(title)
        plt.axis('off')
        plt.show()
    
    @staticmethod
    def show_pair(pair, labels=None, cmap="gray"):
        """Display a pair of images"""
        fig, axes = plt.subplots(1, 2, figsize=(10, 5))
        
        axes[0].imshow(pair[0], cmap=cmap)
        axes[0].set_title("Image 1")
        axes[0].axis('off')
        
        axes[1].imshow(pair[1], cmap=cmap)
        axes[1].set_title("Image 2")
        axes[1].axis('off')
        
        if labels is not None:
            label_text = "Similar" if labels == 1 else "Dissimilar"
            fig.suptitle(f"Pair: {label_text}")
        
        plt.tight_layout()
        plt.show()
    
    @staticmethod
    def plot_training_history(history):
        """Plot training history"""
        fig, axes = plt.subplots(1, 2, figsize=(12, 4))
        
        # Plot loss
        axes[0].plot(history.history['loss'], label='Training Loss')
        axes[0].plot(history.history['val_loss'], label='Validation Loss')
        axes[0].set_title('Model Loss')
        axes[0].set_xlabel('Epoch')
        axes[0].set_ylabel('Loss')
        axes[0].legend()
        
        # Plot accuracy
        axes[1].plot(history.history['accuracy'], label='Training Accuracy')
        axes[1].plot(history.history['val_accuracy'], label='Validation Accuracy')
        axes[1].set_title('Model Accuracy')
        axes[1].set_xlabel('Epoch')
        axes[1].set_ylabel('Accuracy')
        axes[1].legend()
        
        plt.tight_layout()
        plt.show()