import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";
import useSelection from "../../../Hooks/useSelection";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const params= useParams()
    const [selection]= useSelection()
    // console.log(params, selection)

    const payingClass= selection.find(selected=> selected._id == params.id)
    const payingValue= payingClass? payingClass.price : 'Price not found'
    const payingInstructor= payingClass? payingClass.instructor : 'instructor not found'
    const payingClassName= payingClass? payingClass.name : 'class not found'
    const payingClassImage= payingClass? payingClass.image : 'image not found'
    const payingId= payingClass? payingClass.classId : 'id not found'
    const payingClassAvailableSeats= payingClass? payingClass.available_seats : 'seat not found'
    const payingClassStudents= payingClass? payingClass.no_of_students : 'student not found'

    return (
        <div className="w-[600px] mx-auto">
            <h3 className="text-4xl font-serif text-center my-10 text-violet-800">Payment gateway</h3>
            <Elements stripe={stripePromise}>
                <PaymentForm price={payingValue} instructor={payingInstructor} class_name={payingClassName} image={payingClassImage} id={payingId} update_seat={payingClassAvailableSeats} update_student={payingClassStudents}></PaymentForm>
            </Elements>

        </div>
    );
};

export default Payment;