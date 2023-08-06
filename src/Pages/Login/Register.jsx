import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxios from '../../Hooks/useAxios';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [axiosURL] = useAxios()
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handlePasswordToggle = () => {
        setShow(!show)
    }

    const onSubmit = data => {
        // console.log(data)
        setError('')
        if (data.password !== data.confirm) {
            setError('Password did not match')
            return
        }
        createUser(data.email, data.password)

            .then(result => {
                const user = result.user
                console.log(user)

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const savedUser = { name: data.name, email: data.email, image: data.photo, phone: data.phone, gender: data.gender, address: data.address, role: 'student' }
                        console.log(savedUser)
                        fetch('https://assigenment12server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    navigate('/')
                                    Swal.fire({
                                        title: 'Account created successfully',
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                                }
                            })



                    })
                    .catch(err => console.log(err.message))
            })

            .catch(err => console.log(err))
        reset()
    }

    const handleLogInWithGoogle = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser)
                const savedUser = { name: loggedUser?.displayName, email: loggedUser?.email, image: loggedUser?.photoURL, phone: loggedUser?.phoneNumber, gender: loggedUser?.gender, address: loggedUser?.address, role: 'student' }
                console.log(savedUser)
                fetch('https://assigenment12server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        navigate('/')
                        console.log(data.insertedId)
                        Swal.fire({
                            title: 'Account created successfully',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    })
            })
            .catch(err => setError(err.message))
    }

    return (
        <div className="hero min-h-screen login-page-cover-photo px-2 py-3">

            <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-violet-100 text-slate-900">
                <div className="card-body">
                    <h1 className="text-2xl md:text-3xl  text-center font-semibold mb-5">Create account in <span className='changing-text'>Apex sports</span></h1>
                    <button onClick={handleLogInWithGoogle} className="btn bg-white w-60 mx-auto">
                        <span className='mr-2 text-xl'><FcGoogle /> </span> Continue with google
                    </button>

                    <div className="divider">OR</div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input className="input input-bordered" type='text' {...register("name")} />
                        </div>


                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Photo URL</span>
                            </label>
                            <input className="input input-bordered" type='text' {...register("photo")} />
                        </div>


                        <div className='flex flex-col md:flex-row gap-5'>

                            {/* Gender */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Your gender</span>
                                </label>
                                <select className='select select-bordered' defaultValue={"Gender"}  {...register("gender")}>
                                    <option value="female">male</option>
                                    <option value="male">female</option>
                                    <option value="other">other</option>
                                </select>
                            </div>


                            {/* Number */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Your Phone Number</span>
                                </label>
                                <input className="input input-bordered" type='number' {...register("phone")} />
                            </div>

                        </div>

                        {/* Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Address</span>
                            </label>
                            <input className="input input-bordered" type='text' {...register("address")} />
                        </div>


                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email*</span>
                            </label>
                            <input className="input input-bordered" type='email' {...register("email")} />
                        </div>


                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Password*</span>
                            </label>
                            <input className="relative input input-bordered" type={show ? 'text' : 'password'} {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                            })} />
                            <FaEye onClick={handlePasswordToggle} className='absolute bottom-[250px] right-12 text-slate-500 hover:text-slate-700' />

                            {errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>}

                            {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be of six characters at least</span>}

                            {errors.password?.type === 'pattern' && <span className="text-red-600">Password must contain one uppercase letter and one special character</span>}
                        </div>



                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password*</span>
                            </label>
                            <input className="input input-bordered" type='password' {...register("confirm", { required: true })} />
                            {errors.confirm && <span className='text-red-500'>Confirming password is required</span>}
                            {error && <span className='text-red-500 text-sm'>{error}</span>}
                        </div>


                        {/* Submit */}
                        <input className="btn btn-primary form-control mt-6" type="submit" value="Sign up" />
                    </form >
                </div>


                <p className="text-center text-xl mb-4 "><small>Already have an account? <Link className="btn-link" to='/login'>Login</Link></small></p>
            </div>
        </div>
    );
};

export default Register;

