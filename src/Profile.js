import React, {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import './Profile.css';

const Profile = () => {
    let {user, isAuthenticated, isLoading} = useAuth0();

    const Initial = () => {
        isLoading = false;
    }
    useEffect(() => Initial(), []);
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className={"card"}>
                <img src={user.picture} alt={user.name}/>
                <h4>{user.name}</h4>
                <p>{user.nickname}</p>
                <time>Updated at {user.updated_at}</time>
            </div>
        )
    );
};

export default Profile;