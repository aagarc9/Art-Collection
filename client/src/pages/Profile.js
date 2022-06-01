import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { REMOVE_ART, SAVE_ART } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";





const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME)
    const [removeART, { error }] = useMutation(REMOVE_ART)
    const [saveART, { }] = useMutation(SAVE_ART)

    return (
    <div>
        Profile Here!
    </div>   
    );
  };

export default Profile;