import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../src/firebase";
import { useParams } from "react-router-dom";

const Profile = () => {

  const { username } = useParams()

  console.log(username)

    return (
    <div>
        <h1>"Test" `{username}`</h1>
    </div>   
    );
  };

export default Profile;