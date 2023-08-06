import React from 'react';
import { useState } from 'react';

const MyClass = ({ addedClass, index, setUpdatedClassId }) => {
    const { name, feedback, status, _id, no_of_students } = addedClass
    const [disabled]= useState(status === 'approved')

    return (
        <tr className="hover">
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{no_of_students}</td>
            <td>{feedback}</td>
            <td className={`${status == 'approved' ? 'text-green-500' : 'text-red-500'}`}>{status}</td>
            <td><button disabled={disabled} className="btn btn-sm btn-ghost bg-violet-600 text-white" onClick={() => {
                setUpdatedClassId(_id);
                window.my_modal_5.showModal();
            }}>Update</button></td>
        </tr>
    );
};

export default MyClass;