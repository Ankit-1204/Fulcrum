import sys
import json
import numpy as np
from PIL import Image
from io import BytesIO

def process_data(data):
    text_input = data['text']
    image_input = data['image']
    array_input = np.array(data['array'])

    # Example: Convert image bytes to an image object
    image = Image.open(BytesIO(image_input))

    # Example: Just return the text, image size, and array sum as a dummy prediction
    return {
        'text': text_input,
        'image_size': image.size,
        'array_sum': np.sum(array_input)
    }

# Entry point for the script
if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])  # Receive the input from the Node.js server
    result = process_data(input_data)
    print(json.dumps(result))  # Output the result
