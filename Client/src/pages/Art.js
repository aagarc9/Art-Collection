import React, { useState, useEffect } from "react";
import { firebase, doc, getDoc } from "firebase";
import FlipMove from "react-flip-move";
import { db } from "../firebase";
import Post from "../components/Post";
import { useParams } from "react-router-dom";

const ArtPage = () => {
  const [user, setUser] = useState(null);
  const [post, setPosts] = useState([]);
  const { id } = useParams()

  console.log(id)

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
  //     );
  // }, []);

  const currentPost = db.collection("posts").doc(id)

  console.log(currentPost)
    return (
    <main className="header">
      <p>{id} {currentPost.id} {currentPost.username}</p>
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
    </main>
    );
  };

export default ArtPage;

const artObject = {
    title: 'Breakfast',
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    description: 'This is to test front end',
    owner: 'testOwner',
    likesCount: 40,
    viewsCount: 200,
    evokeFunnyCount: 5,
    evokeBeautifulCount: 22,
    evokeSadCount: 1,
    evokeWholesomeCount: 11,
    evokeMysteriousCount: 20,
    evokeThoughtfulCount: 6,
    evokeInspiringCount: 7,
    evokeCalmingCount: 4
  
}



{/* <div class="artpage">
        Welcome to your Art Page!
        <div class="title-art">
         {artObject.title}
        </div>

        <a href={`}${artObject.img}`} target="_blank">
          <img className='art-img'
            src={`${artObject.img}?w=180&h=180&fit=crop&auto=format`}
            srcSet={`${artObject.img}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
            alt={artObject.title}
            loading="lazy"
          />
          </a>
        How does this artwork make you feel?
        <div class="artContainer">
         {artObject.likesCount} People Liked<br></br>
         {artObject.viewsCount} Views <br></br>
         {artObject.evokeFunnyCount} Laughs <br></br>
         {artObject.evokeBeautifulCount} People thought it was Beautiful <br></br>
         {artObject.evokeSadCount} People felt Sad<br></br>
         {artObject.evokeWholesomeCount} Wholesome Likes <br></br>
         {artObject.evokeMysteriousCount} People thought it was Mysterious<br></br>
         {artObject.evokeThoughtfulCount} Thoughtful likes<br></br>
        </div>
    </div>  */}