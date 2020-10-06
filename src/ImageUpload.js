import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";
function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        // when the state of image (uploading...) changes, it takes snapshot and updates the progress
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // add post to database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username,
              caption,
              imageUrl: url,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          })
          .catch((err) => console.log(err.message));
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a Caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />

      <input type="file" onChange={handleChange} />

      <Button onClick={handleUpload}>Upload Post</Button>
    </div>
  );
}

export default ImageUpload;
