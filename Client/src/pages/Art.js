import React, { useState, useEffect } from "react";
import { firebase, doc, getDoc } from "firebase";
import FlipMove from "react-flip-move";
import { db, auth } from "../firebase";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { IconButton , Avatar, Modal, Input, Dialog } from "@mui/material";
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

const ArtPage = (User) => {
  const { id } = useParams()

  const [currentPost, setPost] = useState([]);
  const [evokeSadCount, setSadCount] = useState([])
  const [evokeHeartwarmingCount, setHeartwarmingCount] = useState([])
  const [evokeMysteriousCount, setMysteriousCount] = useState([])
  const [evokeFunnyCount, setFunnyCount] = useState([])
  const [evokeNostalgicCount, setNostalgicCount] = useState([])
  const [evokeInspiringCount, setInspiringCount] = useState([])

  console.log(id)
  console.log(User.user.email)

  useEffect(() => {
    let thisPost;
    if (id) {
      thisPost = db
        .collection("posts")
        .doc(id)
        .onSnapshot((snapshot) => {
          setPost(snapshot.data());
        });
    }
    return () => {
      thisPost();
    };
  }, [id]);

// SAD EVOKE ADD AND QUERY
  const postEvokeSad = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("evokeSad").add({
      email: User.user.email
    });
  };

    useEffect(() => {
      let sadCount;
      if (id) {
        sadCount = db
          .collection("posts")
          .doc(id)
          .collection("evokeSad")
          .onSnapshot((snapshot) => {
            setSadCount(snapshot.docs.length);
          });
      }
      return () => {
        sadCount();
      };
    }, [id]);

// HEARTWARMING EVOKE ADD AND QUERY
const postEvokeHeartwarming = (e) => {
  e.preventDefault();
  db.collection("posts").doc(id).collection("evokeHeartwarming").add({
    email: User.user.email
  });
};

  useEffect(() => {
    let heartwarmingCount;
    if (id) {
      heartwarmingCount = db
        .collection("posts")
        .doc(id)
        .collection("evokeHeartwarming")
        .onSnapshot((snapshot) => {
          setHeartwarmingCount(snapshot.docs.length);
        });
    }
    return () => {
      heartwarmingCount();
    };
  }, [id]);

  // MYSTERIOUS EVOKE ADD AND QUERY
const postEvokeMysterious = (e) => {
  e.preventDefault();
  db.collection("posts").doc(id).collection("evokeMysterious").add({
    email: User.user.email
  });
};

  useEffect(() => {
    let mysteriousCount;
    if (id) {
      mysteriousCount = db
        .collection("posts")
        .doc(id)
        .collection("evokeMysterious")
        .onSnapshot((snapshot) => {
          setMysteriousCount(snapshot.docs.length);
        });
    }
    return () => {
      mysteriousCount();
    };
  }, [id]);

  // FUNNY EVOKE ADD AND QUERY
const postEvokeFunny = (e) => {
  e.preventDefault();
  db.collection("posts").doc(id).collection("evokeFunny").add({
    email: User.user.email
  });
};

  useEffect(() => {
    let funnyCount;
    if (id) {
      funnyCount = db
        .collection("posts")
        .doc(id)
        .collection("evokeFunny")
        .onSnapshot((snapshot) => {
          setFunnyCount(snapshot.docs.length);
        });
    }
    return () => {
      funnyCount();
    };
  }, [id]);

  // NOSTALGIC EVOKE ADD AND QUERY
  const postEvokeNostalgic = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("evokeNostalgic").add({
      email: User.user.email
    });
  };
  
    useEffect(() => {
      let nostalgicCount;
      if (id) {
        nostalgicCount = db
          .collection("posts")
          .doc(id)
          .collection("evokeNostalgic")
          .onSnapshot((snapshot) => {
            setNostalgicCount(snapshot.docs.length);
          });
      }
      return () => {
        nostalgicCount();
      };
    }, [id]);

    // INSPIRING EVOKE ADD AND QUERY
  const postEvokeInspiring = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("evokeInspiring").add({
      email: User.user.email
    });
  };
  
    useEffect(() => {
      let inspiringCount;
      if (id) {
        inspiringCount = db
          .collection("posts")
          .doc(id)
          .collection("evokeInspiring")
          .onSnapshot((snapshot) => {
            setInspiringCount(snapshot.docs.length);
          });
      }
      return () => {
        inspiringCount();
      };
    }, [id]);
  console.log(currentPost)

    return (
    <div className="art__main">
      {/* <p>{id} {currentPost.username} {currentPost.caption} </p> */}
      <h1 className="art__question">What feelings does this art <span className="art__evoke">EVOKE</span>?</h1>

      {/* SECTION FOR EVOKE BUTTONS */}
      <div class="art__container">
      <div className="art__evokeBtnContainer"> Sad: {evokeSadCount}
        <IconButton
              color="secondary"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeSad}
            ><SentimentDissatisfiedOutlinedIcon />
        </IconButton>
      </div>
      <div className="art__evokeBtnContainer"> Heartwarming: {evokeHeartwarmingCount}
        <IconButton
              color="error"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeHeartwarming}
            ><VolunteerActivismOutlinedIcon />
        </IconButton>
      </div>
      <div className="art__evokeBtnContainer"> Mysterious: {evokeMysteriousCount}
        <IconButton
              color="default"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeMysterious}
            >< SearchOutlinedIcon />
        </IconButton>
      </div>
      <div className="art__evokeBtnContainer"> Funny: {evokeFunnyCount}
        <IconButton
              color="info"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeFunny}
            >< SentimentVerySatisfiedOutlinedIcon/>
        </IconButton>
      </div>
      <div className="art__evokeBtnContainer"> Nostalgic: {evokeNostalgicCount}
        <IconButton
              color="success"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeNostalgic}
            ><CottageOutlinedIcon />
        </IconButton>
      </div>
      <div className="art__evokeBtnContainer"> Inspiring: {evokeInspiringCount}
        <IconButton
              // className="art__evokeButton"
              color="warning"
              size="large"
              variant="outline"
              type="submit"
              onClick={postEvokeInspiring}
            ><EmojiObjectsOutlinedIcon />
        </IconButton>
      </div>
      </div>
      <div className="art__postsLeft"> 
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
    </div>
    );
  };

export default ArtPage;
