import React from 'react';
import UserRoleRoute from '../../Routes/UserRoleRoute';

const Profile = () => {
    const [currentUser] = UserRoleRoute()
    console.log(currentUser)

    return (
        <div className='px-5 my-10 text-center'>

            <div className='flex justify-center'>
                <img className='rounded-full' src={currentUser.image ? currentUser.image : 'Unavailable'} alt="" />
            </div>

            <p className='text-2xl font-serif text-violet-800 mt-3 mb-1'>{currentUser.name ? currentUser.name : 'Unavailable'}</p>
            <p>Email: {currentUser.email ? currentUser.email : 'Unavailable'}</p>
            <p>Address: {currentUser.address ? currentUser.address : 'Unavailable'}</p>
            <p>Phone: {currentUser.phone ? currentUser.phone : 'Unavailable'}</p>
            <p>Gender: {currentUser.gender ? currentUser.gender : 'Unavailable'}</p>
            <p>User role: {currentUser.role ? currentUser.role : 'Unavailable'}</p>
        </div>
    );
};

export default Profile;