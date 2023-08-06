import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const AddAClass = () => {
    const { user } = useContext(AuthContext)
    const [axiosURL]= useAxios()
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data)

        const AddedClass={
            name: data.name,
            image: data.photo,
            instructor: data.instructor_name,
            instructor_email: data.email,
            price: data.price,
            no_of_students: 0,
            status: 'pending',
            available_seats: parseFloat(data.seats)
        }
        console.log(AddedClass)

        axiosURL.post('classes', AddedClass)
        .then(data=> {
            console.log(data.data)
            if(data.data.insertedId){
                reset()
                Swal.fire(
                    'Good job!',
                    'Class added request sent',
                    'success'
                  )
                
            }
        })
    }

    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>Add a class</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Picture URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input className="input input-bordered" placeholder="PhotoURL" type='text' {...register("photo")} />
                    </div>

                    {/* Class Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input className="input input-bordered" placeholder="class name" type='text' {...register("name")} />
                    </div>

                    {/* Instructor Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input defaultValue={user?.displayName} className="input input-bordered" placeholder="Instructor name" type='text' {...register("instructor_name")} />
                    </div>

                    {/* Instructor Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        <input defaultValue={user?.email} className="input input-bordered" placeholder="Instructor email" type='email' {...register("email")} />
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input className="input input-bordered" placeholder="Class fee" type='text' {...register("price")} />
                    </div>

                    {/* Available seats */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input className="input input-bordered" placeholder="Available seats" type='text' {...register("seats")} />
                    </div>

                </div>

                <div className="form-control mt-5">
                    <input className="btn bg-violet-500 hover:bg-violet-700 text-white border-0 btn-block" type="submit" value="Add this class" />

                </div>
            </form>
        </div>
    );
};

export default AddAClass;