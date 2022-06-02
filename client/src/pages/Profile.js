import React from "react";



import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_ART, SAVE_ART } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
// import UploadForm from "../components/UploadForm"
// import UploadArt from "../component/UploadArt"

import Auth from '../utils/auth';


const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeART, { error }] = useMutation(REMOVE_ART);
    const [saveART, { }] = useMutation(SAVE_ART);

    let userData
    userData = data?.me || {};
    console.log(userData)
    
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    return (
    <div>
        <h1>Hello {userData.username}</h1>
    </div>   
    );
  };

export default Profile;