import './App.css';
import React, {useState, useEffect } from 'react';
import Post from './post';
import { db } from './firebase'; 

function App() {
  const [posts, setPosts] = useState([
    {
    username:"kylekumar", 
    caption: "Insane image" ,
    imageUrl:"https://img.freepik.com/free-vector/vintage-japanese-art-pattern-illustration_53876-119398.jpg?w=2000",
  },
  {
  username:"kylekumar", 
  caption: "Insane image" ,
  imageUrl:"https://img.freepik.com/free-vector/vintage-japanese-art-pattern-illustration_53876-119398.jpg?w=2000",
  }
  ]); 
  // useEffect(() => {
  //   db.collection('posts').onSnapshot(snapshot => { 
  //     setPosts(snapshot.docs.map(doc => doc.data()));
  //   })

  // }, []); 
  return (
     
    <div className="App">
     <img 
        className="app_headerImage"
        src="https://cdn.pixabay.com/photo/2018/04/11/20/12/silhouette-3311636_960_720.png"    
        alt=""
      />
      <div className="app__header"></div>
      
      <h1> Evoke, a website for art</h1>
      {
        posts.map(post => (
          <Post username={post.username} caption ={post.caption}  imageUrl={post.imageUrl}></Post>
        ))
      }
      <Post username="kylekumar" caption="Insane image" imageUrl=" "/>
      <Post username="janefrobootcamp" caption="Enticing!" imageUrl="https://i.pinimg.com/originals/ea/73/2a/ea732a18f29bcbd7814dfa73a7c5b039.png"/>
      <Post  username="microphoneman22" caption=" i love microphones!" imageUrl="https://media.istockphoto.com/vectors/beautiful-microphone-vector-id153073298?s=612x612"/>
      
    </div>
    
  );
}

export default App;