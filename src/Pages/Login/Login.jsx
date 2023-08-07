import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const location = useLocation()
    const navigate = useNavigate()
    // console.log(navigate)
    const from = location.state?.from?.pathname || '/'

    const handlePasswordToggle = () => {
        setShow(!show)
    }
    const onSubmit = data => {
        console.log(data)
        signIn(data.email, data.password)
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser)
                
                Swal.fire({
                    title: 'Account login successful',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true })
                reset()
            })
            .catch(error => {
                if (error.message == 'Firebase: Error (auth/wrong-password).') {
                    setError('Wrong Password given')
                }
            })
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
                navigate(from, { replace: true })
            })
            .catch(err => setError(err.message))
    }

    return (
        <div className="hero min-h-screen login-page-cover-photo px-2 py-3">

            <div className="card flex-shrink-0 w-full max-w-md  shadow-2xl bg-red-100 text-slate-900">
                <div className="card-body">
                    <h1 className="text-2xl md:text-3xl text-center font-semibold mb-5">Login to your account</h1>

                    <button onClick={handleLogInWithGoogle} className="btn bg-white w-60 mx-auto">
                        <span className='mr-2 text-xl'><FcGoogle /> </span> Continue with google
                    </button>

                    <div className="divider">OR</div>

                    <form onSubmit={handleSubmit(onSubmit)}>


                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email*</span>
                            </label>
                            <input className="input input-bordered text-white" type='email' {...register("email", { required: true })} />
                            {errors.email && <span className='text-red-500'>Email is required</span>}
                        </div>


                        {/* Password */}
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Your Password</span>
                                <span className="btn btn-link btn-xs lowercase">Forgot password?</span>
                            </label>
                            <input className='relative input input-bordered text-white' type={show ? 'text' : 'password'} {...register("password", { required: true })} />
                            <FaEye onClick={handlePasswordToggle} className='absolute bottom-[200px] right-12 text-slate-500 hover:text-slate-700' />

                            {errors.password && <span className='text-red-500 '>Password is required</span>}

                            {error && <span className='text-red-500 text-sm'>{error}</span>}
                        </div>


                        {/* Checkbox */}
                        <div className="form-control mt-5">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-sm" />
                                <span className="label-text">Remember me for 30 days</span>

                            </label>
                        </div>


                        {/* Submit */}
                        <input className="btn btn-primary mt-5" type="submit" value="Login" />

                    </form>
                </div>

                <p className="text-center mb-4 text-xl  "><small>Don't have an account? <Link className="btn-link" to='/register'>Register</Link></small></p>
            </div>
        </div>

    );
};

export default Login;