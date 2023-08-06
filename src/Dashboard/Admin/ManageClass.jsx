import React from 'react';
import useAxios from '../../Hooks/useAxios';

const ManageClass = ({ managedClass, index, setSelectedClassId, updateClassStatus }) => {
    const { _id,image, name, instructor, instructor_email, available_seats, price, status } = managedClass

    const handleApprove = () => {
        updateClassStatus(_id, 'approved');
    }

    const handleDeny = () => {
        updateClassStatus(_id, 'denied');
    }

    return (
        <tr key={_id} className="hover">
           
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="class" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{instructor}</td>
            <td>{instructor_email}</td>
            <td>{available_seats}</td>
            <td>{price}</td>
            {/* TODO: initially pending. make it this way ---> */}
            <td className={`${status == 'approved' ? 'text-green-500' : 'text-red-500'}`}>{status}</td>
            <td>
                <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn m-1 btn-sm">Click</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">

                        <li><button className="btn btn-ghost z-30" onClick={() => { handleApprove(_id) }}>Approve</button></li>
                        <li><button className="btn btn-ghost z-30" onClick={() => { handleDeny(_id) }}>Deny</button></li>
                        <li><button className="btn btn-ghost z-30" onClick={() => {
                            setSelectedClassId(_id);
                            window.my_modal_3.showModal();
                        }}>Send Feedback</button></li>

                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default ManageClass;