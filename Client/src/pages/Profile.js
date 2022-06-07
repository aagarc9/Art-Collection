import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../src/firebase";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([])
  const { username } = useParams()

  console.log(username)

  useEffect(() => {
    let pullUserPost;
    if (username) {
      pullUserPost = db
        .collection("posts")
        .where('username', '==', username)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setUserPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
        });
    }
    return () => {
      pullUserPost();
    };
  }, [username]);

  return (
      <div className="profile__container">
    {/* <div>
        <h1>"Test" `{username}`</h1>
    </div>    */}
    <div className="home__posts">
              {userPosts.map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                />
              ))}
        </div>
    </div>
    );
  };

export default Profile;