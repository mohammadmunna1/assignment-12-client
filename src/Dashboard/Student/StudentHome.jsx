import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const StudentHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
             <h2 className='text-4xl font-serif text-center mt-10 text-violet-800 leading-relaxed'>Welcome to student dashboard<br />{user?.displayName}</h2>
        </div>
    );
};

export default StudentHome;