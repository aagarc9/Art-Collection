import React, { useState, useEffect, forwardRef } from "react";
import Avatar from "@mui/material/Avatar";
import { db } from "../firebase";
import firebase from "firebase";
import { Link } from 'react-router-dom';

const Post = forwardRef(
  ({ user, username, postId, imageUrl, caption }, ref) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    

    useEffect(() => {
      let unsubscribe;
      if (postId) {
        unsubscribe = db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
          });
      }

      return () => {
        unsubscribe();
      };
    }, [postId]);

    const postComment = (e) => {
      e.preventDefault();

      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setComment("");
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>

        <Link to={`/art/${postId}`}>
          <div className="post__image__wrap">
          <img className="post__image" src={imageUrl} alt="post" />
          </div>
          </Link>
        <div className="post__details">
        <h4 className="post__text">
          {username} <span className="post__caption">{caption}</span>
        </h4>

        <div className="post__comments">
          {comments.map((comment) => (
            <p className="post__comment">
              <b>{comment.username}</b> {comment.text} 
               <p className="post__commentDisp">{comment.timestamp ? ((comment.timestamp.toDate().toLocaleTimeString('en-US')) + ' on' + comment.timestamp.toDate().toDateString()) : ""}</p>
            </p>
          ))}
        </div>
        

        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
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
);

export default Post;
