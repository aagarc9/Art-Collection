import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../src/firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);


    return (
    <div>
        <h1>{user}</h1>
    </div>   
    );
  };

export default Profile;