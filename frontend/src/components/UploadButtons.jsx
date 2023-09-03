import React, { useState, useEffect } from "react";
import axios from 'axios'

const UploadAndDisplayImage = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [removeImage, setremoveImage] = useState(false);
  const [data, setData] = useState("");
  const [predictImg, setpredictImg] = useState(false);
  const remove = (event) => {
      event.preventDefault();
      setremoveImage(false);
      setSelectedImage(null);
      
      }


  const sendFile = async () => {
    let formData = new FormData();
      formData.append("file", selectedImage);
      await axios.post("http://localhost:8000/predict",formData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }) 
      .then((res)=>{
        if (res.status === 200){
          setData(res.data);
        }
        
      });
      setpredictImg(true)
      
    }

  return (
    <div className="upload" style={{padding:'15px',border:'1px solid black',width:'18em',display:'flex',justifyContent:'center',flexDirection:'column',backgroundColor:"rgba(133, 130, 132, 0.5)",boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.8)"}}>
        <div className="seeimg" style={{width:'256px',height:"256px"}}>

      {selectedImage === null?
      <></>
      :
        <div>
          <img
            alt="not found"
            width={"256px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <hr />
          
        </div>
      }
        </div>
      

      <br />
      <br />
      {
        removeImage===false?
        <>
        <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          setremoveImage(true)
        }}
        style={{padding:'4px'}}
        />
        </>
        :
        <>
        <button type="submit" style={{marginBottom:'1rem'}} onClick={remove}>Remove</button>
        {
          predictImg === false?
          <button onClick={sendFile}>Predict</button>
          :
          <>
            <h3>Predicted Disease : {data.disease}</h3>
            <h4>Confidence : {data.confidence + "%"}</h4>
          </>

        }
        

        </>
      }
      
    </div>
  );
};

export default UploadAndDisplayImage;