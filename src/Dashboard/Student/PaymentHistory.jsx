import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';

const PaymentHistory = () => {
    const {user}= useContext(AuthContext)
    const [axiosURL]= useAxios()
    const [payments, setPayments] = useState([])

    useEffect(() => {
        axiosURL.get(`payments?email=${user?.email}&sort=newest`)
            .then(data => setPayments(data.data))
    }, [])

    return (
        <div className='w-full px-8'>
            <h2 className='text-4xl font-serif text-center my-10 text-violet-800'>My Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table text-center">

                    <thead>
                        <tr className='text-slate-500'>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>class name</th>
                            <th>Instructor</th>
                            <th>Date & Time</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id} className="hover">
                                <td>{index + 1}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.class_name}</td>
                                <td>{payment.instructor}</td>
                                <td>{payment.date}</td>
                                <td>{payment.price}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;