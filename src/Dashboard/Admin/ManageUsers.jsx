import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import UserRow from './UserRow';
import Swal from 'sweetalert2';
import useAllUsers from '../../Hooks/useAllUsers';

const ManageUsers = () => {
    // const [users, setUsers] = useState([])
    const [users=[], refetch] = useAllUsers()
    const [axiosURL] = useAxios()

    // useEffect(() => {
    //     axiosURL.get('users')
    //         .then(data => setUsers(data.data))
    // }, [])

    const updateUserRole = (id, newRole) => {
        console.log(id, newRole)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, make ${newRole}!`
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assigenment12server.vercel.app/users/${id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({newRole})
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.modifiedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Updated!',
                                `This user is now an ${newRole}`,
                                'success'
                            )
                        }
                    })
            }
        });
    }

    console.log(users)
    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr className='text-slate-500'>
                            <th>#</th>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Roll</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((managedUser, index) => <UserRow
                                key={managedUser._id}
                                index={index}
                                managedUser={managedUser}
                                onUpdateUserRole={updateUserRole}
                            ></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;