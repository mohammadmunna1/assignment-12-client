import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxios from '../../../Hooks/useAxios';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const PaymentForm = ({ price, class_name, instructor, image, id, update_student, update_seat }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useContext(AuthContext)
    const [axiosURL] = useAxios()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)

    // console.log(user.email, user.displayName, price, class_name, instructor)
    useEffect(() => {
        if (price > 0) {
            axiosURL.post('create-payment-intent', { price })
                .then(data => {
                    // console.log(data.data.clientSecret)
                    setClientSecret(data.data.clientSecret)
                })
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        console.log(card)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message)
        }
        else {
            setCardError('')
            console.log('payment method', paymentMethod)
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous user',
                        email: user?.email || 'Email not found',
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError)
        }
        console.log('Payment Intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                instructor,
                class_name,
                date: new Date(),
                status: 'pending',
                image
            }

            axiosURL.post('payments', payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire(
                            'Congratulations!',
                            'You have enrolled in this class',
                            'success'
                        )
                    }
                })

            axiosURL.delete(`selections/${id}`)
                .then(data => console.log(data.data))

            axiosURL.put(`/classes/${id}`)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }

    console.log(update_seat, update_student)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline btn-primary btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-500 mt-1">{cardError}</p>}
        </div>
    );
};

export default PaymentForm;