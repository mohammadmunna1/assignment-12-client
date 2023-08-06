import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Providers/AuthProvider';

const UserRoleRoute = () => {
    const {user, loading}= useContext(AuthContext)
    console.log(user, loading)
    const [currentUser, setCurrentUser]= useState([])
    const [userLoading, setUserLoading]= useState(true)
    const [axiosURL] = useAxios()
    useEffect(() => {
        const fetchUser = async () => {
            if (user?.email) {
              const response = await axiosURL.get(`users/${user.email}`);
              setCurrentUser(response.data);
              setUserLoading(false)
            }
          };
      
          fetchUser();
    }, [user?.email])
    
    console.log(currentUser)
    return [currentUser, userLoading]
};

export default UserRoleRoute;