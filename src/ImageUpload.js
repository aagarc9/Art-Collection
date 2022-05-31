import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";
import { Input, Button } from "@material-ui/core";

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ... shows the progression of the uploading process - kyle 
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ... anything that is going wrong with the code this will be the error function - kyle 
        console.log(error);
      },
      () => {
        // complete function - getting the download link
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside database in firebase dd
            db.collection("posts").add({
              imageUrl: url,
              caption: caption,
              username: username,
              //timestamp allows  for the time of the server upload no matter the location 
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div>
        <input type="file" onChange={handleChange} />
        <Button className="imageupload__button" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      <br />
    </div>
  );
};

export default ImageUpload;
