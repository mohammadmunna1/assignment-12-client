import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../../Hooks/useAxios';

const PopularClass = () => {
    const [axiosURL]= useAxios()
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axiosURL.get('classes?limit=6')
            .then(data => setClasses(data.data))
    }, [])

    console.log(classes)
    return (
        <div>
            <h2 className='text-3xl md:text-5xl text-center text-red-800 mt-8 font-serif '>Demanding Classes</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-10'>
                {
                    classes.map(singleClass => <div
                        key={singleClass._id}
                        className="card w-80 md:w-96 bg-base-100 shadow-xl image-full mx-auto"
                    >

                        <figure><img src={singleClass.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{singleClass.name}</h2>
                            <div className='mb-auto'>
                                <p className='mb-2'>Instructor: {singleClass.instructor}</p>
                                <p className='text-xs'>Students admitted: {singleClass.no_of_students}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to='/classes'><button className="btn btn-primary enroll-button">Enroll Now</button></Link>
                            </div>
                        </div>
                    </div>
                    )}

            </div>
        </div>
    );
};

export default PopularClass;