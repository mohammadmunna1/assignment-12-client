import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import SingleClass from './SingleClass';

const Classes = () => {
    const [axiosURL] = useAxios()
    const user = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    const [usedClasses, setUsedClasses] = useState([])

    useEffect(() => {
        axiosURL.get('classes')
            .then(response => {
                console.log(response.data)
                setClasses(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        const filteredClasses = classes.filter(allClass => allClass.status === 'approved');
        setUsedClasses(filteredClasses);
    }, [classes]);
    
    console.log(classes)
    console.log(usedClasses)

    return (
        <div className='my-16'>
            <h2 className='text-4xl text-center mb-6  font-serif text-violet-800'>Classes</h2>
            <p className='text-justify max-w-5xl mx-auto text-slate-400 px-5'>Our classes are led by highly qualified instructors who are passionate about their respective disciplines. They bring their expertise, energy, and enthusiasm to each session, creating a supportive and motivating environment for everyone. From yoga and dance to strength training and martial arts, our diverse class offerings cater to various interests and fitness levels. Get yourself admitted now</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-10'>
                {
                    usedClasses.map(usedClass => <SingleClass
                        key={usedClass._id}
                        usedClass={usedClass}
                    ></SingleClass>)
                }
            </div>
        </div>
    );
};

export default Classes;