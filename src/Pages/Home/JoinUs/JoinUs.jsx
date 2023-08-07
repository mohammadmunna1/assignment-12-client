import React, { useContext } from 'react';
import './JoinUs.css'
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const JoinUs = () => {
    const { user } = useContext(AuthContext)
    const navigate= useNavigate()
    const location= useLocation()

    const handleJoinNow = () => {
        if (!user) {
            navigate('/login', { state: { from: location } })
        }
        else{
            navigate('/classes')
        }
    }

    return (
        <div className='join-us-bg bg-fixed my-20 h-80 md:h-64 p-6 md:p-10 '>
            <h3 style={{ fontFamily: 'EB Garamond, serif' }} className='text-xl sm:text-2xl md:text-4xl text-red'><span >JOIN US NOW</span> & GET FREE TRAINING!
            </h3>
            <p className='my-6 text-red text-sm md:text-base'>Join us now and take your sports journey to the next level. At E sports, we welcome athletes of all ages and skill levels who are driven to excel in their chosen sports. Whether you're a beginner looking to discover your passion or a seasoned athlete aiming for the podium, we have a place for you in our vibrant community</p>
            <button onClick={handleJoinNow} className='get-started-btn join-us-button'>Join Now</button>
        </div>
    );
};

export default JoinUs;