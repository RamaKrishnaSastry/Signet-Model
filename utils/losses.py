import tensorflow as tf
from config.config import Config

def contrastive_loss(y_true, y_pred, margin=1.0, alpha=1.0, beta=1.0):
    """
    Contrastive loss as described in "Dimensionality Reduction by Learning an Invariant Mapping".
    Args:
        y_true: Binary labels indicating whether the pair is similar (1) or dissimilar (0).
        y_pred: Predicted distances between the pair embeddings.
        margin: Margin for dissimilar pairs (default = 1.0).
        alpha: Weight for dissimilar pair loss term.
        beta: Weight for similar pair loss term.
    Returns:
        Contrastive loss value.
    """
    y_true = tf.cast(y_true, tf.float32)
    square_pred = tf.square(y_pred)
    margin_square = tf.square(tf.maximum(0.0, margin - y_pred))
    
    loss = alpha * (1 - y_true) * square_pred + beta * y_true * margin_square
    return tf.reduce_mean(loss)