import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Providers/AuthProvider';
import useSelection from '../../Hooks/useSelection';
import Swal from 'sweetalert2';

const SelectedClasses = () => {
    const [axiosURL] = useAxios()
    const [selection, refetch]= useSelection()
    // console.log(selection)

    const handleDelete= id=>{
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosURL.delete(`selections/${id}`)
                    .then(data => {
                        console.log(data.data.deletedCount)
                        if (data.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                    })
            }
        })
    }

    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>My selected classes</h2>
            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr className='text-slate-500'>
                            <th>#</th>
                            <th>Class name</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Enroll</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selection.map((selectedClass, index) => <tr key={selectedClass._id} className="hover">
                                <td>{index + 1}</td>
                                <td>{selectedClass.name}</td>
                                <td>{selectedClass.instructor}</td>
                                <td>{selectedClass.price}</td>
                                <td><Link to={`/dashboard/payment/${selectedClass._id}`}><button className="btn btn-sm btn-ghost bg-green-600 text-white">PAY</button></Link></td>
                                <td><button className="btn btn-sm btn-ghost bg-red-500 text-white" onClick={() => handleDelete(selectedClass._id)}>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;