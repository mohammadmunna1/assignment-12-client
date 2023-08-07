import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import ManageClass from './ManageClass';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [axiosURL] = useAxios()
    const [managedClasses, setManagedClasses] = useState([])
    const [selectedClassId, setSelectedClassId] = useState([])
    const [textareaValue, setTextareaValue] = useState('');

    useEffect(() => {
        axiosURL.get('classes')
            .then(response => {
                console.log(response.data)
                setManagedClasses(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
      };
      console.log(textareaValue)

    const updateClassStatus = (id, newStatus) => {
        console.log(id, newStatus)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, update status to ${newStatus}!`
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assigenment12server.vercel.app/classes/${id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ newStatus})
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.modifiedCount > 0) {
                            const updatedClassStatus = managedClasses.map((managedClass) =>
                                managedClass._id === id ? { ...managedClass, status: newStatus } : managedClass
                            );
                            setManagedClasses(updatedClassStatus);
                            Swal.fire(
                                'Updated!',
                                `This class is now ${newStatus}`,
                                'success'
                            )
                        }
                    })
            }
        });
    }


    const handleFeedback = id => {
            fetch(`https://assigenment12server.vercel.app/classes/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({textareaValue})
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Feedback sent successfully',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                })
        
    }

    console.log(managedClasses)
    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-red-800'>Manage classes</h2>

            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Write Your feedback</h3>
                    <textarea value={textareaValue} onChange={handleTextareaChange} className='w-full h-60 input input-bordered mt-2 mb-4' name="feedback" id="feedback"></textarea>
                    <button onClick={() => handleFeedback(selectedClassId)} className='btn btn-primary'>Send feedback</button>
                </form>
            </dialog>
            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr  className='text-slate-500'>
                            <th>#</th>
                            <th></th>
                            <th>Class name</th>
                            <th>Instructor</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            managedClasses.map((managedClass, index) => <ManageClass
                                key={managedClass._id}
                                managedClass={managedClass}
                                index={index}
                                setSelectedClassId={setSelectedClassId}
                                updateClassStatus={updateClassStatus}
                            ></ManageClass>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;