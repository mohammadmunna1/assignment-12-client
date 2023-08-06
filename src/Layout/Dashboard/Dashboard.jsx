import React, { useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { TbHomeMove } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { MdManageAccounts, MdOutlinePendingActions, MdPayments } from 'react-icons/md';
import { RiListSettingsFill } from 'react-icons/ri';
import { BiAddToQueue, BiSelectMultiple } from 'react-icons/bi';
import { IoSchool } from 'react-icons/io5';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserRoleRoute from '../../Routes/UserRoleRoute';


const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser]= UserRoleRoute()
    let isAdmin = false
    let isInstructor = false

    if(currentUser.role=== 'admin') isAdmin=true
    if(currentUser.role=== 'instructor') isInstructor=true

    useEffect(() => {
        let initialLink = '/dashboard/studentHome';

        if (isAdmin) {
            initialLink = '/dashboard/adminHome';
        } else if (isInstructor) {
            initialLink = '/dashboard/instructorHome';
        }

        navigate(initialLink);
    }, [isAdmin, isInstructor, navigate]);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="my-drawer-2" className="btn btn-outline rounded-full btn-primary drawer-button lg:hidden me-auto mt-5 ms-5">
                    <span className="menu-icon">☰</span>
                </label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-gradient-to-b from-violet-300 via-fuchsia-300 to-violet-300 text-base-content">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/manageClasses'><RiListSettingsFill /> Manage classes</NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers'><MdManageAccounts /> Manage users</NavLink></li>
                            </>

                            : isInstructor ?
                                <>
                                    <li><NavLink to='/dashboard/instructorHome'><FaHome /> Instructor Home</NavLink></li>
                                    <li><NavLink to='/dashboard/addAClass'><BiAddToQueue /> Add a class</NavLink></li>
                                    <li><NavLink to='/dashboard/myClasses'><IoSchool /> My classes</NavLink></li>
                                </>

                                : <>
                                    <li><NavLink to='/dashboard/studentHome'><FaHome /> Student Home</NavLink></li>
                                    <li><NavLink to='/dashboard/selectedClasses'><MdOutlinePendingActions /> My selected classes</NavLink></li>
                                    <li><NavLink to='/dashboard/enrolledClasses'><BiSelectMultiple /> My enrolled classes</NavLink></li>
                                    <li><NavLink to='/dashboard/paymentHistory'><MdPayments /> My Payment History</NavLink></li>
                                </>
                    }


                    <div className="divider"></div>
                    <li><NavLink to='/'><TbHomeMove /> Home</NavLink></li>
                    <li><NavLink to='/classes'><SiGoogleclassroom />Classes</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;