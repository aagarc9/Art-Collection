//IMPORT DEPENDENCIES
import React, { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./firebase";
import { Button, Avatar, Modal, Input, Dialog } from "@mui/material";
import FlipMove from "react-flip-move";
// import { InstagramEmbed } from "react-social-media-embed";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';

//IMPORT PAGES
import Art from "./pages/Art"
import Profile from "./pages/Profile"

//IMPORT COMPONENTS
import Post from "./components/Post";
import ImageUpload from "./components/ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 400,
//     height: 200,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

function App() {
  // const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };

  return (

  <Router>
    <div className="home">
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='home__modal'>
          <form className="home__login">
            <center>
              <img
                className="home__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Evoke_Logo_for_wikipedia_use.jpg"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Dialog>

      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <div className='home__modal'>
          <form className="home__login">
            <center>
              <img
                className="home__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Evoke_Logo_for_wikipedia_use.jpg"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
          </form>
        </div>
      </Dialog>
      <div className="home__header">
        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
        <img
          className="home__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Evoke_Logo_for_wikipedia_use.jpg"
          alt=""
        />
        </NavLink>
{/* TEMPORARY LINK TO ART PAGE */}
        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/art">
          ART LINK TEMPORARY
        </NavLink>
        {user?.displayName ? (
          <div className="home__headerRight">
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/profile">
            <h2> {user.displayName} </h2>
            </NavLink>
            <Button className="btn__logout" onClick={() => auth.signOut()}>Logout</Button>
            <Avatar
              className="home__headerAvatar"
              alt={user.displayName}
              src="/static/images/avatar/1.jpg"
            />
          </div>
        ) : (
          <form className="app__loginHome">
            <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
          </form>
        )}
      </div>
    <Switch>
    <Route exact path="/" >
      <div className="home">
        <div className="home__posts">
          <div className="home__postsLeft">
            <FlipMove>
              {posts.map(({ id, post }) => (
                <Post
                  user={user}
                  key={id}
                  postId={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                />
              ))}
            </FlipMove>
          </div>
          {/* <div className="home__postsRight">
            <InstagramEmbed
              url="https://www.instagram.com/bts.bighitofficial/?hl=en"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div> */}

        </div>
        <div>        
        {user?.displayName ? (
          <div className="home__upload">
            <ImageUpload username={user.displayName} />
          </div>
        ) : (
          <center>
            <h3>Login to upload</h3>
          </center>
        )}
        </div>
    </div>
    </Route>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/art" component={Art}/>
    </Switch> 
    </div>
    </Router>
  );
}

export default App;
