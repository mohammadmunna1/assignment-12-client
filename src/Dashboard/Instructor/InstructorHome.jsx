import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const InstructorHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
             <h2 className='text-4xl font-serif text-center mt-10 text-red-800 leading-relaxed'>Welcome to instructor dashboard<br />{user?.displayName}</h2>
        </div>
    );
};

export default InstructorHome;