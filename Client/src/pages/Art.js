import React, { useState, useEffect } from "react";
import { firebase, doc, getDoc } from "firebase";
import FlipMove from "react-flip-move";
import { db, auth } from "../firebase";
import Post from "../components/Post";
import { useParams } from "react-router-dom";

const ArtPage = (User) => {
  const [currentPost, setPost] = useState([]);
  const { id } = useParams()

  console.log(id)
  console.log(User.user.displayName)


  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("posts")
        .doc(id)
        .onSnapshot((snapshot) => {
          setPost(snapshot.data());
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);


  const postEvokeSad = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("evokeSad").add({
      email: null
    });
  };
  

  console.log(currentPost)

    return (
    <main className="header art__main">
      <p>{id} {currentPost.username} {currentPost.caption} </p>
      <h2>How does this art make you feel?</h2>
      <div className="art__postsLeft"> xx
        <FlipMove>
                <Post
                  key={currentPost.id}
                  postId={currentPost.id}
                  username={currentPost.username}
                  caption={currentPost.caption}
                  imageUrl={currentPost.imageUrl}
              />
         </FlipMove>
      </div>

      {/* SECTION FOR EVOKE BUTTONS */}
      <div className="art__evokeBtnContainer"> TEST SAD
        <button
              className="art__evokeSadButton"
              type="submit"
              onClick={postEvokeSad}
            >
        </button>
      </div>
    </main>


    );
  };

export default ArtPage;
