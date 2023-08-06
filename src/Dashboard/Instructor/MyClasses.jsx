import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Providers/AuthProvider';
import { useContext } from 'react';
import MyClass from './MyClass';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const { user } = useContext(AuthContext)
    const [axiosURL] = useAxios()
    const [addedClasses, setAddedClasses] = useState([]);
    const [updatedClassId, setUpdatedClassId] = useState([])
    const { register, handleSubmit, } = useForm();

    useEffect(() => {
        axiosURL.get(`classes?email=${user?.email}`)
            .then(data => setAddedClasses(data.data))
    }, [])

    const onSubmit = data => {
        console.log(data)
        const updatedValues={
            name: data.name,
            image: data.image,
            price: data.price
        }
        console.log(updatedClassId, updatedValues)

        axiosURL.patch(`/classes/${updatedClassId}`, {updatedValues})
            .then(response => {
                console.log(response.data)
                if(response.data.modifiedCount>0){
                    Swal.fire({
                        title: 'Details updated successfully',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
            });
    }



    console.log(addedClasses)

    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>My classes</h2>

            <dialog id="my_modal_5" className="modal -z-30">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Update Properties</h3>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input className="input input-bordered" type='text' {...register("name")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input className="input input-bordered" type='text' {...register("image")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input className="input input-bordered" type='text' {...register("price")} />
                    </div>
                    <input className="btn btn-primary form-control mt-6" type="submit" value="Update" />

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr className='text-slate-500'>
                            <th>#</th>
                            <th>Class name</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addedClasses.map((addedClass, index) => <MyClass
                                key={addedClass._id}
                                addedClass={addedClass}
                                index={index}
                                setUpdatedClassId={setUpdatedClassId}
                            ></MyClass>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;