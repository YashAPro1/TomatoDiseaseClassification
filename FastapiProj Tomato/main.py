from fastapi import FastAPI,File,UploadFile
import uvicorn
import tensorflow as tf
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/test')
async def test():
    return "Hello I'm Here u wanna see what disease your tomato have"
MODEL = tf.keras.models.load_model("./1")
class_names = ['Tomato_Bacterial_spot','Tomato_Early_blight','Tomato_Late_blight','Tomato_Leaf_Mold','Tomato_Septoria_leaf_spot','Tomato_Spider_mites_Two_spotted_spider_mite','Tomato__Target_Spot','Tomato__Tomato_YellowLeaf__Curl_Virus','Tomato__Tomato_mosaic_virus','Tomato_healthy']
def read_file(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post('/predict')
async def predict(
    file: UploadFile = File(...)
):
    image = read_file(await file.read())
    batch_of_img = np.expand_dims(image,0)
    prediction = MODEL.predict(batch_of_img)
    disease_name = class_names[np.argmax(prediction[0])]
    confidence = np.max(100*prediction[0])
    return {
        'disease': disease_name,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)