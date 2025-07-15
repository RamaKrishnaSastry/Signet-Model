import tensorflow as tf
from config.config import Config
from utils.losses import contrastive_loss

def evaluate_model(model_path=None, test_pairs=None, test_labels=None):
    config = Config()
    
    if model_path is None:
        model_path = config.MODEL_SAVE_PATH
    
    # Load model
    print("Loading model...")
    model = tf.keras.models.load_model(model_path, custom_objects={'contrastive_loss': contrastive_loss})
    
    # Evaluate model
    print("Evaluating model...")
    loss, accuracy = model.evaluate([test_pairs[:, 0], test_pairs[:, 1]], test_labels, verbose=1)
    print(f"Test Accuracy: {accuracy * 100:.2f}%")
    print(f"Test Loss: {loss:.4f}")
    
    return loss, accuracy

if __name__ == "__main__":
    evaluate_model()