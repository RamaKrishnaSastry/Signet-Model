import tensorflow as tf
from train import train_model
from evaluate import evaluate_model

def main():
    # Check GPU availability
    print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))
    print("Using GPU:", tf.test.is_gpu_available(cuda_only=True))
    
    # Train model
    print("Starting training...")
    model, (test_pairs, test_labels) = train_model()
    
    # Evaluate model
    print("Starting evaluation...")
    evaluate_model(test_pairs=test_pairs, test_labels=test_labels)

if __name__ == "__main__":
    main()