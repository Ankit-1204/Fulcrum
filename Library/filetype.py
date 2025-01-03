import os

def infer_model_type(model_path):
    ext = os.path.splitext(model_path)[-1].lower()
    if ext in [".pt", ".pth"]:
        return "pytorch"
    elif ext == ".h5":
        return "keras"
    elif ext == ".onnx":
        return "onnx"
    elif ext in [".pb", ".savedmodel", ".ckpt"]:
        return "tensorflow"
    elif ext == ".joblib":
        return "sklearn"
    elif ext == ".pkl":
        return "pickle"
    elif ext == ".mlmodel":
        return "coreml"
    elif ext == ".tflite":
        return "tflite"
    elif ext == ".hdf5":
        return "hdf5"  
    elif ext == ".json":
        return "xgboost"  
    elif ext == ".bson":
        return "catboost"
    elif ext == ".pmml":
        return "pmml" 
    elif ext == ".mar":
        return "torchserve"
    elif ext == ".zip":
        return "lightgbm"  
    elif ext == ".sav":
        return "scikit-learn"  
    elif ext == ".rds":
        return "r"  
    elif ext == ".dill":
        return "dill"  
    else:
        return "unknown"
