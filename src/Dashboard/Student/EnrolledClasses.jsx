import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const EnrolledClasses = () => {
    const {user}= useContext(AuthContext)
    const [axiosURL]= useAxios()
    const [enrolledClasses, setEnrolledClasses] = useState([])
    console.log(user)

    useEffect(() => {
        axiosURL.get(`payments?email=${user?.email}`)
            .then(data => setEnrolledClasses(data.data))
    }, [])

    console.log(enrolledClasses)
    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>My enrolled classes</h2>
            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr className='text-slate-500'>
                            <th>#</th>
                            <th></th>
                            <th>Class name</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enrolledClasses.map((enrolledClass, index) => <tr key={enrolledClass._id} className="hover">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={enrolledClass?.image} alt="class" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{enrolledClass.class_name}</td>
                                <td>{enrolledClass.instructor}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;