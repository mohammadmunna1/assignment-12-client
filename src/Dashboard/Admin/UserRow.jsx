import React from 'react';
import { useState } from 'react';

const useRoleDisabledState = (initialRole) => {
    const [instructorDisabled, setInstructorDisabled] = useState(initialRole === 'instructor' || initialRole === 'admin');
    const [adminDisabled, setAdminDisabled] = useState(initialRole === 'admin');

    return {
        instructorDisabled,
        adminDisabled,
        setInstructorDisabled,
        setAdminDisabled,
    };
};

const UserRow = ({ managedUser, index, onUpdateUserRole }) => {
    
    const { _id, photoURL, name, email, role } = managedUser
    const { instructorDisabled, adminDisabled } = useRoleDisabledState(role);

    const handleMakeInstructor = () => {
        onUpdateUserRole(_id, 'instructor');
    }

    const handleMakeAdmin = () => {
        onUpdateUserRole(_id, 'admin');
    }
    return (
        <tr className="hover">
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={photoURL} alt="class" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <div className='flex justify-center gap-2'>

                    <button className='btn btn-outline btn-primary btn-sm' disabled={instructorDisabled} onClick={ handleMakeInstructor}>Make Instructor</button>

                    <button className='btn btn-outline btn-primary btn-sm' disabled={adminDisabled} onClick={handleMakeAdmin}>Make Admin</button>

                </div>
            </td>
        </tr>
    );
};

export default UserRow;