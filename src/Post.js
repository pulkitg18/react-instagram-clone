import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
//

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [state, setState] = useState(false);
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  // const storyRef = db
  //   .collection("posts")
  //   .doc(postId)
  //   .collection("likes")
  //   .doc("hello-world");
  // storyRef.update({ count: increment });

  const [likes, setLikes] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")

        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    let likeop;
    if (postId) {
      likeop = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      likeop();
    };
  }, [postId]);

  console.log("likes >>>>>>", likes);

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("likes")

      .add({
        counrfesgh: 0,
      });
  }, []);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  const incrementLike = () => {
    if (state === false) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc("hello-world")
        .update({
          count: increment,
        });
      setState(true);
    } else {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc("hello-world")
        .update({
          count: decrement,
        });
      setState(false);
    }

    // setLikes(likes + 1);
    // setState(true);
    // if (state === true) {
    //   setLikes(likes - 1);
    //   setState(false);
    // }
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="PulkitGupta"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <div className="test">
        <div className="post__like">
          <FavoriteBorderIcon
            className="post__likeIcon"
            onClick={incrementLike}
          >
            Like{" "}
          </FavoriteBorderIcon>
          {likes.map((like) => (
            <p className="post__likeCounter">{like.count} </p>
          ))}
          <p className="post__likeCounter"> Likes</p>
        </div>

        <h4 className="post__text">
          <strong>{username}</strong> {caption}
        </h4>

        <div className="post__comments">
          {comments.length === 0 ? <h4>No comments</h4> : <h4>Comments</h4>}
          {comments.map((comment) => (
            <p>
              <strong>{comment.username} </strong>
              {comment.text} {comment.like}
            </p>
          ))}
        </div>
        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Post;
